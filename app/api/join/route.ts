import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!
  );
  const resend = new Resend(process.env.RESEND_API_KEY!);
  const body = await req.json();
  const { name, email, phone, age, role, experience, availability, message } = body;

  // 1. Save to Supabase
  const { error: dbError } = await supabase.from("applications").insert([
    { name, email, phone, age, role, experience, availability, message },
  ]);

  if (dbError) {
    console.error("Supabase error:", dbError);
    return NextResponse.json({ error: "Failed to save application." }, { status: 500 });
  }

  // 2. Send email notification
  const roleLabel: Record<string, string> = {
    "opening-batsman": "Opening Batsman",
    "middle-order": "Middle-Order Batsman",
    "all-rounder": "All-Rounder",
    "fast-bowler": "Fast Bowler",
    "spin-bowler": "Spin Bowler",
    "wicket-keeper": "Wicket-Keeper",
  };

  const { error: emailError } = await resend.emails.send({
    from: "Dcorp Cricket Club <onboarding@resend.dev>",
    to: "harishreddy20@gmail.com",
    subject: `New Join Application — ${name}`,
    html: `
      <div style="font-family:sans-serif;max-width:560px;margin:0 auto;color:#111827">
        <div style="background:#dc2626;padding:20px 24px;border-radius:12px 12px 0 0">
          <h1 style="color:#fff;margin:0;font-size:20px">New Club Application</h1>
          <p style="color:#fca5a5;margin:4px 0 0;font-size:13px">Dcorp Cricket Club — TSCL 35 2026</p>
        </div>
        <div style="border:1px solid #e5e7eb;border-top:none;border-radius:0 0 12px 12px;padding:24px">
          <table style="width:100%;border-collapse:collapse;font-size:14px">
            <tr><td style="padding:8px 0;color:#6b7280;width:140px">Name</td><td style="padding:8px 0;font-weight:600">${name}</td></tr>
            <tr><td style="padding:8px 0;color:#6b7280">Email</td><td style="padding:8px 0"><a href="mailto:${email}" style="color:#dc2626">${email}</a></td></tr>
            <tr><td style="padding:8px 0;color:#6b7280">Phone</td><td style="padding:8px 0">${phone || "—"}</td></tr>
            <tr><td style="padding:8px 0;color:#6b7280">Age</td><td style="padding:8px 0">${age || "—"}</td></tr>
            <tr><td style="padding:8px 0;color:#6b7280">Playing Role</td><td style="padding:8px 0">${roleLabel[role] ?? role}</td></tr>
            <tr><td style="padding:8px 0;color:#6b7280">Experience</td><td style="padding:8px 0;text-transform:capitalize">${experience}</td></tr>
            <tr><td style="padding:8px 0;color:#6b7280">Availability</td><td style="padding:8px 0;text-transform:capitalize">${availability || "—"}</td></tr>
          </table>
          ${message ? `<div style="margin-top:16px;padding:14px;background:#f9fafb;border-radius:8px;font-size:13px;color:#374151"><strong>Message:</strong><br/>${message}</div>` : ""}
        </div>
        <p style="text-align:center;color:#9ca3af;font-size:12px;margin-top:16px">Dcorp Cricket Club · Oklahoma City</p>
      </div>
    `,
  });

  if (emailError) {
    // Don't fail the whole request if email fails — data is already saved
    console.error("Resend error:", emailError);
  }

  // 3. Send WhatsApp notification to group
  const waMessage = `🏏 *New Join Application*\n\n*Name:* ${name}\n*Role:* ${roleLabel[role] ?? role}\n*Experience:* ${experience}\n*Phone:* ${phone || "—"}\n*Email:* ${email}${message ? `\n*Message:* ${message}` : ""}`;

  try {
    await fetch(
      `https://api.green-api.com/waInstance${process.env.GREEN_API_INSTANCE_ID}/sendMessage/${process.env.GREEN_API_TOKEN}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chatId: process.env.WHATSAPP_GROUP_ID,
          message: waMessage,
        }),
      }
    );
  } catch (err) {
    // Don't fail the request if WhatsApp notification fails
    console.error("WhatsApp notification error:", err);
  }

  return NextResponse.json({ success: true });
}
