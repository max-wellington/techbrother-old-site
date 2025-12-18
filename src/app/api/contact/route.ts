import { Resend } from "resend";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY is not defined in environment variables");
    return Response.json(
      { error: "Email service is not configured" },
      { status: 500 }
    );
  }
  const resend = new Resend(apiKey);
  try {
    const body = await request.json();
    const { firstName, lastName, email, company, message } = body;

    if (!firstName || !lastName || !email || !message) {
      return Response.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const { data, error } = await resend.emails.send({
      from: "TechBrother Contact <onboarding@resend.dev>",
      to: ["max@techbrother.io"],
      replyTo: email,
      subject: `New Contact Request from ${firstName} ${lastName}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Company:</strong> ${company || "Not provided"}</p>
        <h3>Message:</h3>
        <p>${message}</p>
      `,
    });

    if (error) {
      return Response.json({ error: error.message }, { status: 500 });
    }

    return Response.json({ success: true, data });
  } catch (error) {
    return Response.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
}
