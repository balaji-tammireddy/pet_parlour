import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbSetup/dbSetup";
import User from "@/models/userModel";
import Pet from "@/models/petModel";
import Booking from "@/models/bookingModel";
import jwt from "jsonwebtoken";

connect();

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ userId: string }> }
) {
  try {
    const { userId } = await context.params;

    const token = req.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };

    if (decoded.id !== userId) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const user = await User.findById(userId).select("-password");

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const pets = await Pet.find({ userId });

    const today = new Date();
    const bookings = await Booking.find({
      userId,
      date: { $gte: today },
    }).sort({ date: 1 });

    return NextResponse.json({
      success: true,
      user,
      pets,
      bookings,
    });
  } catch (error: any) {
    console.error("Dashboard fetch error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}