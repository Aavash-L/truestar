import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";

const schema = z.object({
  name: z.string().min(2, "Name required"),
  phone: z.string().min(10, "Valid phone required"),
  message: z.string().min(1, "Message required"),
  consent: z.boolean(),
  pageUrl: z.string().optional(),
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

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") ?? req.headers.get("x-real-ip") ?? "unknown";
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
  const fromEmail = process.env.CONTACT_FROM_EMAIL ?? "noreply@truestarcontracting.com";
  const toEmail = process.env.CONTACT_TO_EMAIL ?? "info@truestarcontracting.com";

  if (!apiKey) {
    console.log("[Chat Lead]", body);
    return NextResponse.json({ ok: true });
  }

  const resend = new Resend(apiKey);
  const timestamp = new Date().toLocaleString("en-US", { timeZone: "America/New_York" });
  const ua = (req.headers.get("user-agent") ?? "unknown").slice(0, 120);
  const subject = `Chat widget lead: ${body.name} — ${body.phone}`;

  const html = `
    <h2>Chat Widget Lead</h2>
    <table cellpadding="8" border="1" style="border-collapse:collapse">
      <tr><th>Name</th><td>${body.name}</td></tr>
      <tr><th>Phone</th><td>${body.phone}</td></tr>
      <tr><th>Message</th><td>${body.message}</td></tr>
      <tr><th>Page URL</th><td>${body.pageUrl ?? "—"}</td></tr>
      <tr><th>Submitted</th><td>${timestamp} ET</td></tr>
      <tr><th>User Agent</th><td>${ua}</td></tr>
    </table>
  `;

  const text = [
    "Chat Widget Lead",
    "---",
    `Name: ${body.name}`,
    `Phone: ${body.phone}`,
    `Message: ${body.message}`,
    `Page URL: ${body.pageUrl ?? "—"}`,
    `Submitted: ${timestamp} ET`,
    `User Agent: ${ua}`,
  ].join("\n");

  try {
    await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      subject,
      html,
      text,
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[Resend error — chat-lead]", err);
    return NextResponse.json({ ok: false, error: "Failed to send" }, { status: 500 });
  }
}
