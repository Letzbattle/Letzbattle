import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Batch send emails function
const sendBatchEmails = async (
  emails: string[],
  subject: string,
  message: string,
  batchSize: number,
  delayMs: number
): Promise<string[]> => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "nexgenbattles.tech@gmail.com",
      pass: process.env.GMAIL_PASSWORD,
    },
  });

  const failedEmails: string[] = [];

  const emailBatches = [];
  for (let i = 0; i < emails.length; i += batchSize) {
    emailBatches.push(emails.slice(i, i + batchSize));
  }

  for (const batch of emailBatches) {
    console.log(`Sending batch of ${batch.length} emails...`);
    const sendEmailPromises = batch.map(async (email) => {
      try {
        await transporter.sendMail({
          from: `"Your Name" <${process.env.GMAIL_USER}>`,
          to: email,
          subject,
          text: message,
        });
        console.log(`Email sent to: ${email}`);
      } catch (error:any) {
        console.error(`Failed to send email to ${email}:`, error.message);
        failedEmails.push(email);
      }
    });

    await Promise.all(sendEmailPromises);
    console.log(`Batch sent. Waiting for ${delayMs / 1000} seconds...`);
    await new Promise((resolve) => setTimeout(resolve, delayMs));
  }

  return failedEmails;
};

// API Route Handler
export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { emails, subject, message } = body;

    if (!emails || !Array.isArray(emails) || !subject || !message) {
      return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
    }

    const batchSize = 3;
    const delayMs = 15000;

    const failedEmails = await sendBatchEmails(emails, subject, message, batchSize, delayMs);

    if (failedEmails.length > 0) {
      return NextResponse.json(
        { message: "Some emails failed to send.", failedEmails },
        { status: 207 }
      );
    }

    return NextResponse.json({ message: "All emails sent successfully!" }, { status: 200 });
  } catch (error) {
    console.error("Error in email API:", error);
    return NextResponse.json({ error: "An error occurred while sending emails." }, { status: 500 });
  }
}

// sh -i "C:\Users\Dell\Downloads\nexgenbattles.pem" ubuntu@
// sh -i "C:\Users\Dell\Downloads\nexgenbattles.pem" ubuntu@13.48.138.35ALTER USER yourusername WITH SUPERUSER;
