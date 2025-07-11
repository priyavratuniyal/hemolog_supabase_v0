// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
import "jsr:@supabase/functions-js/edge-runtime.d.ts"

console.log("Hello from Functions!")

Deno.serve(async (req) => {
  try {
    const { email } = await req.json();
    if (!email) {
      return new Response(JSON.stringify({ error: "Missing email" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Send email using Resend API directly
    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${Deno.env.get("RESEND_API_KEY")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Hemolog <noreply@hemolog.in>",
        to: email,
        subject: "Welcome to Hemolog! 🩸 You're on the early access list",
        html: `
          <!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Welcome to Hemolog</title>
            <style>
              body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                line-height: 1.6;
                color: #374151;
                margin: 0;
                padding: 0;
                background-color: #f9fafb;
              }
              .container {
                max-width: 600px;
                margin: 0 auto;
                background-color: #ffffff;
                border-radius: 12px;
                overflow: hidden;
                box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
              }
              .header {
                background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
                color: white;
                padding: 40px 30px;
                text-align: center;
              }
              .header h1 {
                margin: 0;
                font-size: 28px;
                font-weight: 700;
                margin-bottom: 8px;
              }
              .header p {
                margin: 0;
                opacity: 0.9;
                font-size: 16px;
              }
              .content {
                padding: 40px 30px;
              }
              .welcome-message {
                font-size: 18px;
                color: #1f2937;
                margin-bottom: 30px;
                line-height: 1.7;
              }
              .feature-grid {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 20px;
                margin: 30px 0;
              }
              .feature-item {
                background-color: #f8fafc;
                padding: 20px;
                border-radius: 8px;
                border-left: 4px solid #ef4444;
              }
              .feature-title {
                font-weight: 600;
                color: #1f2937;
                margin-bottom: 8px;
                font-size: 16px;
              }
              .feature-desc {
                color: #6b7280;
                font-size: 14px;
                line-height: 1.5;
              }
              .cta-section {
                background-color: #fef2f2;
                border: 1px solid #fecaca;
                border-radius: 8px;
                padding: 24px;
                margin: 30px 0;
                text-align: center;
              }
              .cta-title {
                font-weight: 600;
                color: #991b1b;
                margin-bottom: 12px;
                font-size: 18px;
              }
              .cta-text {
                color: #7f1d1d;
                font-size: 16px;
                line-height: 1.6;
              }
              .footer {
                background-color: #f9fafb;
                padding: 30px;
                text-align: center;
                border-top: 1px solid #e5e7eb;
              }
              .footer-text {
                color: #6b7280;
                font-size: 14px;
                line-height: 1.5;
              }
              .badge {
                display: inline-flex;
                align-items: center;
                background-color: #fef2f2;
                color: #991b1b;
                padding: 6px 12px;
                border-radius: 20px;
                font-size: 12px;
                font-weight: 500;
                margin: 4px;
              }
              .badge-container {
                margin: 20px 0;
                text-align: center;
              }
              @media (max-width: 600px) {
                .feature-grid {
                  grid-template-columns: 1fr;
                }
                .header, .content, .footer {
                  padding: 20px;
                }
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>🎉 Welcome to Hemolog!</h1>
                <p>You're now on our early access list</p>
              </div>
              
              <div class="content">
                <div class="welcome-message">
                  Hi there! 👋<br><br>
                  
                  Thanks for believing in <strong>hemolog</strong>. We're building something special for families like yours who deserve better health management.<br><br>
                  
                  Managing blood reports shouldn't feel messy. That's why we're creating a simple, secure way to track your family's health over time.
                </div>
                
                <div class="badge-container">
                  <span class="badge">🔒 DISHA Compliant</span>
                  <span class="badge">🛡️ End-to-End Encrypted</span>
                  <span class="badge">👨‍👩‍👧‍👦 Family-First</span>
                </div>
                
                <div class="feature-grid">
                  <div class="feature-item">
                    <div class="feature-title">📈 See Trends, Not Just Numbers</div>
                    <div class="feature-desc">Track how your values shift over time—spot rising cholesterol, falling hemoglobin, or anything off before it becomes a problem.</div>
                  </div>
                  <div class="feature-item">
                    <div class="feature-title">🔔 Smart Health Alerts</div>
                    <div class="feature-desc">Get personalized notifications when something changes in your baseline—not just based on generic 'normal' ranges.</div>
                  </div>
                  <div class="feature-item">
                    <div class="feature-title">📁 All Reports in One Place</div>
                    <div class="feature-desc">Upload, search, and organize every blood report across your family. No more PDFs lost in WhatsApp or Drive.</div>
                  </div>
                  <div class="feature-item">
                    <div class="feature-title">📤 Share Securely</div>
                    <div class="feature-desc">Need to update your sibling or consult a doctor? Share your report summary securely in seconds—no login needed.</div>
                  </div>
                </div>
                
                <div class="cta-section">
                  <div class="cta-title">What's Next?</div>
                  <div class="cta-text">
                    We'll reach out to you within <strong>72 hours</strong> with early access details and a special invitation to our private beta.<br><br>
                    In the meantime, we're working hard to make hemolog the best it can be for you and your family.
                  </div>
                </div>
                
                <div style="text-align: center; margin-top: 30px;">
                  <p style="color: #6b7280; font-size: 14px; margin: 0;">
                    Questions? Just reply to this email. We'd love to hear from you! 💬
                  </p>
                </div>
              </div>
              
              <div class="footer">
                <div class="footer-text">
                  <strong>Hemolog Health Technologies</strong><br>
                  Dehradun, Uttarakhand, India<br><br>
                  We respect your privacy and follow India's DPDP Act.<br>
                  No spam. No sharing. Ever.<br><br>
                  © 2024 Hemolog. All rights reserved.
                </div>
              </div>
            </div>
          </body>
          </html>
        `,
        text: `Welcome to Hemolog! 🎉

Hi there! 👋

Thanks for believing in hemolog. We're building something special for families like yours who deserve better health management.

Managing blood reports shouldn't feel messy. That's why we're creating a simple, secure way to track your family's health over time.

🔒 DISHA Compliant | 🛡️ End-to-End Encrypted | 👨‍👩‍👧‍👦 Family-First

WHAT WE'RE BUILDING FOR YOU:

📈 See Trends, Not Just Numbers
Track how your values shift over time—spot rising cholesterol, falling hemoglobin, or anything off before it becomes a problem.

🔔 Smart Health Alerts
Get personalized notifications when something changes in your baseline—not just based on generic 'normal' ranges.

📁 All Reports in One Place
Upload, search, and organize every blood report across your family. No more PDFs lost in WhatsApp or Drive.

📤 Share Securely
Need to update your sibling or consult a doctor? Share your report summary securely in seconds—no login needed.

WHAT'S NEXT?

We'll reach out to you within 72 hours with early access details and a special invitation to our private beta.

In the meantime, we're working hard to make hemolog the best it can be for you and your family.

Questions? Just reply to this email. We'd love to hear from you! 💬

---
Hemolog Health Technologies
Dehradun, Uttarakhand, India

We respect your privacy and follow India's DPDP Act.
No spam. No sharing. Ever.

© 2024 Hemolog. All rights reserved.`,
      }),
    });

    if (!resendResponse.ok) {
      const errorData = await resendResponse.json();
      console.error("Resend API error:", errorData);
      return new Response(JSON.stringify({ error: "Failed to send email" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("Function error:", e);
    return new Response(JSON.stringify({ error: "Failed to send email" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
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
