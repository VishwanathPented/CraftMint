import "server-only";
import { Resend } from "resend";

/**
 * Transactional email via Resend: a confirmation auto-reply to the person
 * who submitted a form, and an internal notification to the Craftmint team.
 *
 * Failures here are logged, not thrown — a lead/sample-request must still
 * save even if Resend is unreachable or misconfigured.
 */

let client: Resend | null = null;

function getResend(): Resend | null {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return null;
  if (!client) client = new Resend(apiKey);
  return client;
}

const FROM = process.env.EMAIL_FROM || "Craftmint LLP <info@craftmint.in>";
const NOTIFY_TO = process.env.EMAIL_NOTIFY_TO || "info@craftmint.in";

function wrapper(bodyHtml: string): string {
  return `
    <div style="font-family: Georgia, 'Times New Roman', serif; max-width: 560px; margin: 0 auto; color: #2b2b28;">
      <p style="font-family: Arial, sans-serif; font-size: 11px; letter-spacing: 0.24em; text-transform: uppercase; color: #8a8378; margin: 0 0 24px;">
        Craftmint LLP
      </p>
      ${bodyHtml}
      <hr style="border: none; border-top: 1px solid #e5e1d8; margin: 32px 0 16px;" />
      <p style="font-family: Arial, sans-serif; font-size: 12px; color: #8a8378; margin: 0;">
        Craftmint LLP · info@craftmint.in
      </p>
    </div>
  `;
}

async function send(to: string, subject: string, html: string) {
  const resend = getResend();
  if (!resend) {
    console.warn("[email] RESEND_API_KEY not set — skipping send:", subject, "→", to);
    return;
  }
  try {
    const { error } = await resend.emails.send({ from: FROM, to, subject, html: wrapper(html) });
    if (error) console.error("[email] Resend error:", error);
  } catch (err) {
    console.error("[email] Failed to send:", err);
  }
}

export async function sendLeadEmails(lead: { name: string; email: string; mobile?: string; source: string; page: string }) {
  await Promise.all([
    send(
      lead.email,
      "Thank you for reaching out to Craftmint",
      `
        <p style="font-family: Georgia, serif; font-size: 22px; margin: 0 0 16px;">Thank you, ${escapeHtml(lead.name)}.</p>
        <p style="font-family: Arial, sans-serif; font-size: 14px; line-height: 1.6; color: #4a463f;">
          We've received your details and a member of the Craftmint team will be in touch shortly
          to discuss your project.
        </p>
        <p style="font-family: Arial, sans-serif; font-size: 14px; line-height: 1.6; color: #4a463f;">
          In the meantime, feel free to explore our
          <a href="https://craftmint.in/finishes" style="color: #2b2b28;">range of finishes</a>.
        </p>
      `,
    ),
    send(
      NOTIFY_TO,
      `New enquiry — ${lead.name}`,
      `
        <p style="font-family: Georgia, serif; font-size: 22px; margin: 0 0 16px;">New enquiry received</p>
        <table style="font-family: Arial, sans-serif; font-size: 14px; color: #2b2b28; border-collapse: collapse;">
          <tr><td style="padding: 4px 12px 4px 0; color: #8a8378;">Name</td><td>${escapeHtml(lead.name)}</td></tr>
          <tr><td style="padding: 4px 12px 4px 0; color: #8a8378;">Email</td><td>${escapeHtml(lead.email)}</td></tr>
          <tr><td style="padding: 4px 12px 4px 0; color: #8a8378;">Mobile</td><td>${escapeHtml(lead.mobile || "—")}</td></tr>
          <tr><td style="padding: 4px 12px 4px 0; color: #8a8378;">Source</td><td>${escapeHtml(lead.source)}</td></tr>
          <tr><td style="padding: 4px 12px 4px 0; color: #8a8378;">Page</td><td>${escapeHtml(lead.page)}</td></tr>
        </table>
      `,
    ),
  ]);
}

export async function sendSampleRequestEmails(req: {
  name: string;
  email: string;
  mobile?: string;
  company?: string;
  projectType?: string;
  projectLocation?: string;
  finishSlug?: string;
  estimatedArea?: string;
  message?: string;
}) {
  await Promise.all([
    send(
      req.email,
      "Your sample request — Craftmint",
      `
        <p style="font-family: Georgia, serif; font-size: 22px; margin: 0 0 16px;">Thank you, ${escapeHtml(req.name)}.</p>
        <p style="font-family: Arial, sans-serif; font-size: 14px; line-height: 1.6; color: #4a463f;">
          We've received your sample request${req.finishSlug ? ` for <strong>${escapeHtml(req.finishSlug)}</strong>` : ""}.
          Our team will confirm availability and dispatch details shortly.
        </p>
      `,
    ),
    send(
      NOTIFY_TO,
      `New sample request — ${req.name}`,
      `
        <p style="font-family: Georgia, serif; font-size: 22px; margin: 0 0 16px;">New sample request</p>
        <table style="font-family: Arial, sans-serif; font-size: 14px; color: #2b2b28; border-collapse: collapse;">
          <tr><td style="padding: 4px 12px 4px 0; color: #8a8378;">Name</td><td>${escapeHtml(req.name)}</td></tr>
          <tr><td style="padding: 4px 12px 4px 0; color: #8a8378;">Email</td><td>${escapeHtml(req.email)}</td></tr>
          <tr><td style="padding: 4px 12px 4px 0; color: #8a8378;">Mobile</td><td>${escapeHtml(req.mobile || "—")}</td></tr>
          <tr><td style="padding: 4px 12px 4px 0; color: #8a8378;">Company</td><td>${escapeHtml(req.company || "—")}</td></tr>
          <tr><td style="padding: 4px 12px 4px 0; color: #8a8378;">Project type</td><td>${escapeHtml(req.projectType || "—")}</td></tr>
          <tr><td style="padding: 4px 12px 4px 0; color: #8a8378;">Location</td><td>${escapeHtml(req.projectLocation || "—")}</td></tr>
          <tr><td style="padding: 4px 12px 4px 0; color: #8a8378;">Finish</td><td>${escapeHtml(req.finishSlug || "—")}</td></tr>
          <tr><td style="padding: 4px 12px 4px 0; color: #8a8378;">Area</td><td>${escapeHtml(req.estimatedArea || "—")}</td></tr>
          <tr><td style="padding: 4px 12px 4px 0; color: #8a8378; vertical-align: top;">Message</td><td>${escapeHtml(req.message || "—")}</td></tr>
        </table>
      `,
    ),
  ]);
}

export async function sendAdminReplyEmail(reply: { to: string; subject: string; message: string }): Promise<{ ok: boolean; error?: string }> {
  const resend = getResend();
  if (!resend) {
    return { ok: false, error: "RESEND_API_KEY not set" };
  }
  const html = `<p style="font-family: Arial, sans-serif; font-size: 14px; line-height: 1.6; color: #4a463f; white-space: pre-wrap;">${escapeHtml(reply.message)}</p>`;
  try {
    const { error } = await resend.emails.send({
      from: FROM,
      to: reply.to,
      subject: reply.subject,
      replyTo: NOTIFY_TO,
      html: wrapper(html),
    });
    if (error) return { ok: false, error: error.message };
    return { ok: true };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : "Failed to send" };
  }
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
