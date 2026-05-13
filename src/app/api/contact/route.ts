import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";

const schema = z.object({
  name: z.string().min(2),
  phone: z.string().min(10),
  email: z.string().email(),
  service: z.string().min(1),
  town: z.string().min(1),
  address: z.string().optional(),
  message: z.string().optional(),
});

// In-memory rate limiter (resets on cold start — good enough for this use case)
const rateMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 5; // requests
const RATE_WINDOW = 60 * 60 * 1000; // 1 hour

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

const serviceLabels: Record<string, string> = {
  demolition: "Demolition",
  "asbestos-removal": "Asbestos Removal & Abatement",
  "mold-remediation": "Mold Remediation",
  multiple: "Multiple Services",
  "not-sure": "Not Sure",
};

export async function POST(req: NextRequest) {
  // Rate limit
  const ip = req.headers.get("x-forwarded-for") ?? req.headers.get("x-real-ip") ?? "unknown";
  if (!checkRateLimit(ip)) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  // Validate body
  let body: z.infer<typeof schema>;
  try {
    body = schema.parse(await req.json());
  } catch {
    return NextResponse.json({ error: "Invalid form data" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.CONTACT_FROM_EMAIL ?? "noreply@truestarcontracting.com";
  const toEmail = process.env.CONTACT_TO_EMAIL ?? "info@truestarcontracting.com";

  if (!apiKey) {
    // In dev without env vars, log and return success
    console.log("[Contact Form]", body);
    return NextResponse.json({ success: true });
  }

  const resend = new Resend(apiKey);
  const service = serviceLabels[body.service] ?? body.service;
  const timestamp = new Date().toLocaleString("en-US", { timeZone: "America/New_York" });

  const subject = `New estimate request: ${body.name} — ${service} in ${body.town}`;

  const html = `
    <h2>New Estimate Request</h2>
    <table cellpadding="8" border="1" style="border-collapse:collapse">
      <tr><th>Name</th><td>${body.name}</td></tr>
      <tr><th>Phone</th><td>${body.phone}</td></tr>
      <tr><th>Email</th><td>${body.email}</td></tr>
      <tr><th>Service</th><td>${service}</td></tr>
      <tr><th>Town</th><td>${body.town}</td></tr>
      <tr><th>Address</th><td>${body.address ?? "—"}</td></tr>
      <tr><th>Message</th><td>${body.message ?? "—"}</td></tr>
      <tr><th>Submitted</th><td>${timestamp} ET</td></tr>
    </table>
  `;

  const text = [
    "New Estimate Request",
    "---",
    `Name: ${body.name}`,
    `Phone: ${body.phone}`,
    `Email: ${body.email}`,
    `Service: ${service}`,
    `Town: ${body.town}`,
    `Address: ${body.address ?? "—"}`,
    `Message: ${body.message ?? "—"}`,
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

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[Resend error]", err);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
