import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbSetup/dbSetup";
import Booking from "@/models/bookingModel";
import Pet from "@/models/petModel";
import jwt from "jsonwebtoken";

connect();

// GET all bookings for a user
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

    const bookings = await Booking.find({ userId }).sort({ date: 1 });
    return NextResponse.json(bookings);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// CREATE a new booking
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

    const { petId, serviceType, date, time, address, specialInstructions, amount } = await req.json();

    const pet = await Pet.findById(petId);
    if (!pet || pet.userId.toString() !== userId) {
      return NextResponse.json({ error: "Pet not found or not owned by user" }, { status: 404 });
    }

    const newBooking = new Booking({
      userId,
      petId,
      petName: pet.petName,
      serviceType,
      date,
      time,
      address,
      bookingStatus: "booked",
      serviceStatus: "pending",
      specialInstructions,
      amount,
      paymentStatus: "pending",
      petPhoto: pet.image,
    });

    await newBooking.save();

    return NextResponse.json({ success: true, booking: newBooking });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
