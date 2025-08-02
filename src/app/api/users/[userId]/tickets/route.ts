import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbSetup/dbSetup";
import Ticket from "@/models/ticketModel";
import User from "@/models/userModel";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import { v4 as uuidv4 } from "uuid";

connect();

// GET all tickets for a user
export async function GET(
  req: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const { userId } = params;
    const token = req.cookies.get("token")?.value;

    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };
    if (decoded.id !== userId) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

    const tickets = await Ticket.find({ userId }).sort({ createdAt: -1 });
    return NextResponse.json(tickets);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST create a new ticket
export async function POST(
  req: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const { userId } = params;
    const token = req.cookies.get("token")?.value;

    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };
    if (decoded.id !== userId) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

    const { subject, message } = await req.json();

    const user = await User.findById(userId);
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    const newTicket = new Ticket({
      userId,
      ticketId: `TICKET-${uuidv4()}`,
      subject,
      message,
      status: "open",
    });

    await newTicket.save();

    // Send confirmation email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
    });

    await transporter.sendMail({
      from: `"The Pet Parlour" <${process.env.EMAIL_USER}>`,
      to: user.email,
      subject: "Ticket Raised Successfully",
      text: `Dear ${user.name},\n\nYour ticket (${newTicket.ticketId}) has been successfully raised. Our team will get back to you shortly.\n\nSubject: ${subject}\n\nMessage: ${message}\n\nThank you,\nThe Pet Parlour`,
    });

    return NextResponse.json({ success: true, ticket: newTicket });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
