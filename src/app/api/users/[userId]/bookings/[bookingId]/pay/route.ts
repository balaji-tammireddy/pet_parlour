import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbSetup/dbSetup";
import Booking from "@/models/bookingModel";
import User from "@/models/userModel";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";

connect();

export async function POST(
  req: NextRequest,
  { params }: { params: { userId: string; bookingId: string } }
) {
  try {
    const { userId, bookingId } = params;
    const { password } = await req.json();

    const token = req.cookies.get("token")?.value;
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };
    if (decoded.id !== userId) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

    // Verify user password
    const user = await User.findById(userId);
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return NextResponse.json({ error: "Invalid password" }, { status: 400 });

    // Update booking payment status
    const booking = await Booking.findOne({ _id: bookingId, userId });
    if (!booking) return NextResponse.json({ error: "Booking not found" }, { status: 404 });

    booking.paymentStatus = "paid";
    await booking.save();

    // Send email confirmation
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
    });

    await transporter.sendMail({
      from: `"The Pet Parlour" <${process.env.EMAIL_USER}>`,
      to: user.email,
      subject: "Payment Successful",
      text: `Your payment for booking ${booking._id} was successful.`,
    });

    return NextResponse.json({ success: true, booking });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
