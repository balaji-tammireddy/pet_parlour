import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbSetup/dbSetup";
import Pet from "@/models/petModel";
import jwt from "jsonwebtoken";

connect();

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

    const pets = await Pet.find({ userId });
    return NextResponse.json(pets);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

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

    const { petName, petType, age, gender, breed, vaccinated, image } = await req.json();

    const newPet = new Pet({ userId, petName, petType, age, gender, breed, vaccinated, image });
    await newPet.save();

    return NextResponse.json({ success: true, pet: newPet });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
