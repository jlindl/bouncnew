// Receives contact-form and newsletter submissions.
// Set CONTACT_WEBHOOK_URL (Zapier, Make, Slack, Resend relay…) to forward each
// submission as JSON. Without it, submissions are validated and logged only.

type Payload = {
  type?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  topic?: string;
  message?: string;
  newsletter?: string | boolean;
  company?: string; // honeypot
};

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const clean = (v: unknown, max = 2000) => (typeof v === "string" ? v.trim().slice(0, max) : "");

export async function POST(req: Request) {
  let body: Payload;
  try {
    body = await req.json();
  } catch {
    return Response.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }

  // Bots fill the hidden field; pretend success
  if (clean(body.company)) return Response.json({ ok: true });

  const type = body.type === "newsletter" ? "newsletter" : "contact";
  const email = clean(body.email, 254);
  if (!EMAIL.test(email)) {
    return Response.json({ ok: false, error: "Please enter a valid email address." }, { status: 422 });
  }

  const submission =
    type === "newsletter"
      ? { type, email }
      : {
          type,
          firstName: clean(body.firstName, 80),
          lastName: clean(body.lastName, 80),
          email,
          phone: clean(body.phone, 40),
          topic: clean(body.topic, 80),
          message: clean(body.message),
          newsletter: body.newsletter === true || body.newsletter === "on",
        };

  if (type === "contact" && (!submission.firstName || !submission.message)) {
    return Response.json({ ok: false, error: "Please add your name and a message." }, { status: 422 });
  }

  const webhook = process.env.CONTACT_WEBHOOK_URL;
  if (webhook) {
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...submission, receivedAt: new Date().toISOString(), source: "bounc.uk" }),
    });
    if (!res.ok) return Response.json({ ok: false, error: "Could not send right now." }, { status: 502 });
  } else {
    console.info("[contact] submission (no CONTACT_WEBHOOK_URL set)", submission);
  }

  return Response.json({ ok: true });
}
