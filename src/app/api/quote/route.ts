import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";

const schema = z.object({
  name: z.string().min(2),
  phone: z.string().min(10),
  email: z.string().email(),
  address: z.string().min(5),
  category: z.enum(["residential", "commercial", "specialty", "other"]),
  serviceType: z.string().min(1),
  notes: z.string().optional(),
});

const rateMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 5;
const RATE_WINDOW = 60 * 60 * 1000;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateMap.get(ip);
  if (!record || now > record.resetAt) {
    rateMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW });
    return true;
  }
  if (record.count >= RATE_LIMIT) return false;
  record.count++;
  return true;
}

function extractTown(address: string): string {
  const parts = address.split(",");
  if (parts.length >= 2) return parts[parts.length - 2].trim();
  return "address pending";
}

const CATEGORY_LABELS: Record<string, string> = {
  residential: "Residential",
  commercial: "Commercial",
  specialty: "Specialty (Asbestos & Mold)",
  other: "Other",
};

export async function POST(req: NextRequest) {
  const ip =
    req.headers.get("x-forwarded-for") ??
    req.headers.get("x-real-ip") ??
    "unknown";
  if (!checkRateLimit(ip)) {
    return NextResponse.json({ ok: false, error: "Too many requests" }, { status: 429 });
  }

  let body: z.infer<typeof schema>;
  try {
    body = schema.parse(await req.json());
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid form data" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail =
    process.env.CONTACT_FROM_EMAIL ?? "noreply@truestarcontracting.com";
  const toEmail =
    process.env.CONTACT_TO_EMAIL ?? "info@truestarcontracting.com";

  if (!apiKey) {
    console.log("[Quote Form]", body);
    return NextResponse.json({ ok: true });
  }

  const resend = new Resend(apiKey);
  const timestamp = new Date().toLocaleString("en-US", { timeZone: "America/New_York" });
  const town = extractTown(body.address);
  const categoryLabel = CATEGORY_LABELS[body.category] ?? body.category;
  const subject = `New quote request: ${body.name} — ${body.serviceType} in ${town}`;

  const html = `
    <h2>New Quote Request</h2>
    <table cellpadding="8" border="1" style="border-collapse:collapse">
      <tr><th>Name</th><td>${body.name}</td></tr>
      <tr><th>Phone</th><td>${body.phone}</td></tr>
      <tr><th>Email</th><td>${body.email}</td></tr>
      <tr><th>Address</th><td>${body.address}</td></tr>
      <tr><th>Category</th><td>${categoryLabel}</td></tr>
      <tr><th>Service Type</th><td>${body.serviceType}</td></tr>
      <tr><th>Notes</th><td>${body.notes ?? "—"}</td></tr>
      <tr><th>Submitted</th><td>${timestamp} ET</td></tr>
    </table>
  `;

  const text = [
    "New Quote Request",
    "---",
    `Name: ${body.name}`,
    `Phone: ${body.phone}`,
    `Email: ${body.email}`,
    `Address: ${body.address}`,
    `Category: ${categoryLabel}`,
    `Service Type: ${body.serviceType}`,
    `Notes: ${body.notes ?? "—"}`,
    `Submitted: ${timestamp} ET`,
  ].join("\n");

  try {
    await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      replyTo: body.email,
      subject,
      html,
      text,
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[Resend error — quote]", err);
    return NextResponse.json({ ok: false, error: "Failed to send" }, { status: 500 });
  }
}
