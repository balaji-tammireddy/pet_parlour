import { NextRequest, NextResponse } from "next/server";
import { sendContactConfirmationToUser } from "@/lib/mailer";

export async function POST(req: NextRequest) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    await sendContactConfirmationToUser(name, email);

    return NextResponse.json({ message: "Thank you email sent successfully" }, { status: 200 });
  } catch (error: any) {
    console.error("Contact form error:", error);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
