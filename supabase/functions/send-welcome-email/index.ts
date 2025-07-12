// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs

import "jsr:@supabase/functions-js/edge-runtime.d.ts";
console.log("Hemolog: Edge Function triggered");
Deno.serve(async (req)=>{
  try {
    const { email } = await req.json();
    if (!email) {
      console.warn("[EMAIL] Missing email in request body.");
      return new Response(JSON.stringify({
        error: "Missing email"
      }), {
        status: 400,
        headers: {
          "Content-Type": "application/json"
        }
      });
    }
    console.log(`[EMAIL] New signup: ${email}`);
    const htmlContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Welcome to Hemolog</title>
        <style>
          body {
            font-family: system-ui, sans-serif;
            background: #f9fafb;
            color: #1f2937;
            margin: 0;
            padding: 0;
          }
          .container {
            max-width: 600px;
            margin: auto;
            background: #ffffff;
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0 2px 8px rgba(0,0,0,0.05);
          }
          .header {
            background: #ffffff;
            padding: 24px;
            text-align: center;
          }
          .header img {
            max-width: 200px;
            height: auto;
            display: block;
            margin: 0 auto;
          }
          .content {
            padding: 32px;
            font-size: 16px;
            line-height: 1.6;
          }
          .features ul {
            padding-left: 20px;
          }
          .footer {
            padding: 24px;
            font-size: 14px;
            color: #6b7280;
            text-align: center;
            background: #f9fafb;
            border-top: 1px solid #e5e7eb;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <a href="https://hemolog.in" target="_blank" rel="noopener">
              <img src="https://hemolog.in/email_assets/hemolog_logo_email.png" alt="hemolog" />
            </a>
          </div>
          <div class="content">
            <p>Hey there,</p>
            <p>Thank you for joining the Hemolog early access list. We're genuinely glad you're here.</p>
            <p>
              If you're someone who tracks your family's health — maybe your parents', maybe your own — you know how overwhelming it can be.<br /><br />
              - PDFs scattered across emails and WhatsApp.<br />
              - Numbers that make no sense.<br />
              - And the constant worry: are things getting better… or worse?
            </p>
            <p>You’re not alone.<br />We’ve been there too — and that’s exactly why we’re building Hemolog.</p>

            <div class="features">
              <p><strong>Hemolog helps you:</strong></p>
              <ul>
                <li>📈 Track key markers like hemoglobin, sugar, cholesterol — across time, not just one report</li>
                <li>🔔 Get alerts when something meaningful changes — based on your history, not just "normal" ranges</li>
                <li>🗂️ Store, search, and share reports — securely, simply, and without technical hassle</li>
                <li>🔐 Your data stays private — fully encrypted, never sold, and only visible to you</li>
              </ul>
            </div>

            <p>
              You might already use something else — Apple Health, HealthifyMe, or maybe nothing at all.<br /><br />
              But Hemolog isn’t trying to be everything.<br />
              We’re focused on one thing: making blood test tracking make sense.<br /><br />
              No clutter. No ads. No confusing dashboards.<br />
              Just peace of mind, when it matters most.
            </p>

            <p>
              We believe your health data is personal — and should stay that way.<br />
              Everything we build keeps privacy and consent at the center.
            </p>

            <p>
              We're still building — no loud launch, no growth hacks.<br />
              Just quiet, thoughtful progress toward a tool we wish existed earlier.
            </p>

            <p>
              You’ll get your early access invite soon.<br />
              And if you reply to this email — we’ll read it. Every single time.
            </p>

            <p>Thanks again for being early.<br />We don’t take it for granted.</p>
            <p>– Team <span style="color: #dc2626; font-weight: 600;">hemolog</span></p>
          </div>

          <div class="footer">
            Currently in development — based in India 🇮🇳<br /><br />
            We respect your privacy.<br /> No spam. No tracking. Ever.<br /><br />
            © 2025 hemolog. All rights reserved.<br />
            <a href="https://www.hemolog.in" target="_blank" style="color: #dc2626; text-decoration: none;">hemolog.in</a>
          </div>
        </div>
      </body>
      </html>
    `;
    const textContent = `
Hey there,

Thank you for joining the Hemolog early access list. We're genuinely glad you're here.

If you're someone who tracks your family's health — maybe your parents', maybe your own — you know how overwhelming it can be.
PDFs scattered across emails and WhatsApp.
Numbers that make no sense.
And the constant worry: are things getting better… or worse?

You’re not alone.
We’ve been there too — and that’s exactly why we’re building Hemolog.

Hemolog helps you:
📈 Track key markers like hemoglobin, sugar, cholesterol — across time, not just one report
🔔 Get alerts when something meaningful changes — based on your history, not just "normal" ranges
🗂️ Store, search, and share reports — securely, simply, and without technical hassle
🔐 Your data stays private — fully encrypted, never sold, and only visible to you

You might already use something else — Apple Health, HealthifyMe, or maybe nothing at all.
But Hemolog isn’t trying to be everything.
We’re focused on one thing: making blood test tracking make sense.
No clutter. No ads. No confusing dashboards.
Just peace of mind, when it matters most.

We believe your health data is personal — and should stay that way.
Everything we build keeps privacy and consent at the center.

We're still building — no loud launch, no growth hacks.
Just quiet, thoughtful progress toward a tool we wish existed earlier.

You’ll get your early access invite soon.
And if you reply to this email — we’ll read it. Every single time.

Thanks again for being early.
We don’t take it for granted.

– Team Hemolog
Currently in development — based in India 🇮🇳
We respect your privacy. No spam. No tracking. Ever.
© 2025 Hemolog. All rights reserved.
www.hemolog.in
    `;
    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${Deno.env.get("RESEND_API_KEY")}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        from: "Hemolog <earlyaccess@hemolog.in>",
        to: email,
        subject: "You’re in — Hemolog early access confirmed 🩸",
        html: htmlContent,
        text: textContent
      })
    });
    const status = resendResponse.status;
    console.log(`[EMAIL] Resend API status: ${status}`);
    if (!resendResponse.ok) {
      const errorData = await resendResponse.json();
      console.error("[EMAIL] Resend API error:", errorData);
      return new Response(JSON.stringify({
        error: "Failed to send email"
      }), {
        status: 500,
        headers: {
          "Content-Type": "application/json"
        }
      });
    }
    return new Response(JSON.stringify({
      success: true
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json"
      }
    });
  } catch (e) {
    console.error("[EMAIL] Function error:", e);
    return new Response(JSON.stringify({
      error: "Function error"
    }), {
      status: 500,
      headers: {
        "Content-Type": "application/json"
      }
    });
  }
});



/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/send-welcome-email' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'

*/
