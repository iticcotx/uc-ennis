import { site } from "@/lib/site";

// Appointment requests are emailed to the front desk.
//
// This route handles the Resend path, used when RESEND_API_KEY is set
// (optionally with APPOINTMENTS_FROM, a verified sender). Mail then comes from
// our own domain, which is the sturdiest option — set both in Vercel →
// Settings → Environment Variables.
//
// With no Resend key the route answers 503 `use-client-relay`, and the form
// relays to FormSubmit from the patient's BROWSER instead. FormSubmit answers
// 403 to calls from Vercel's datacenter IPs, so it cannot be called here — it
// only accepts real browsers. Failing that, the form hands the patient a
// pre-filled email, so a request is never silently dropped.

const FIELD_MAX = 400;
const NOTES_MAX = 2000;

// Where requests land. APPOINTMENTS_TO only exists so the delivery path can be
// exercised against a throwaway address without emailing the real front desk.
const recipient = () => process.env.APPOINTMENTS_TO || site.frontDeskEmail;

type Payload = {
  name?: unknown;
  phone?: unknown;
  email?: unknown;
  reason?: unknown;
  preferredDate?: unknown;
  timeWindow?: unknown;
  notes?: unknown;
  botField?: unknown;
};

const clean = (v: unknown, max = FIELD_MAX) =>
  typeof v === "string" ? v.trim().slice(0, max) : "";

export async function POST(request: Request) {
  let body: Payload;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "bad-request" }, { status: 400 });
  }

  // Hidden field only a bot would fill in.
  if (clean(body.botField)) {
    return Response.json({ ok: true });
  }

  const name = clean(body.name);
  const phone = clean(body.phone);
  const email = clean(body.email);
  const reason = clean(body.reason);
  const preferredDate = clean(body.preferredDate, 40);
  const timeWindow = clean(body.timeWindow, 40);
  const notes = clean(body.notes, NOTES_MAX);

  if (!name || !phone || !reason || !preferredDate) {
    return Response.json({ error: "missing-fields" }, { status: 422 });
  }

  const rows: [string, string][] = [
    ["Patient", name],
    ["Phone", phone],
    ["Email", email || "— not provided —"],
    ["Reason for visit", reason],
    ["Preferred day", preferredDate],
    ["Preferred time", timeWindow || "— no preference —"],
    ["Notes", notes || "—"],
  ];

  const text = rows.map(([k, v]) => `${k}: ${v}`).join("\n");
  const html = `<h2 style="font-family:sans-serif">New appointment request</h2>
<table style="font-family:sans-serif;font-size:14px;border-collapse:collapse">
${rows
  .map(
    ([k, v]) =>
      `<tr><td style="padding:6px 14px 6px 0;color:#4a5163"><strong>${k}</strong></td><td style="padding:6px 0">${escapeHtml(v)}</td></tr>`
  )
  .join("\n")}
</table>
<p style="font-family:sans-serif;font-size:12px;color:#4a5163">Sent from the ${site.name} website. Reply to this email to reach the patient${email ? "" : " — no email address was provided, so call them"}.</p>`;

  const subject = `Appointment request — ${name} (${preferredDate})`;
  const apiKey = process.env.RESEND_API_KEY;

  if (apiKey && (await sendWithResend(apiKey, subject, text, html, email))) {
    return Response.json({ ok: true });
  }

  // Nothing was sent from the server. Log it so the request is recoverable
  // (Vercel → Project → Logs) even if the browser relay also fails, then tell
  // the form to relay from the browser.
  console.error(
    "APPOINTMENT REQUEST NOT SENT SERVER-SIDE —",
    rows.map(([k, v]) => `${k}: ${v}`).join(" | ")
  );

  return Response.json(
    { error: "use-client-relay", recipient: recipient(), subject, rows },
    { status: 503 }
  );
}

async function sendWithResend(
  apiKey: string,
  subject: string,
  text: string,
  html: string,
  replyTo: string
) {
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from:
          process.env.APPOINTMENTS_FROM ||
          `${site.name} <onboarding@resend.dev>`,
        to: [recipient()],
        ...(replyTo ? { reply_to: replyTo } : {}),
        subject,
        text,
        html,
      }),
    });
    if (res.ok) return true;
    console.error("Resend rejected the appointment email:", res.status, await res.text());
  } catch (err) {
    console.error("Resend request failed:", err);
  }
  return false;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
