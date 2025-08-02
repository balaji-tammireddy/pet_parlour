import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbSetup/dbSetup";
import Pet from "@/models/petModel";
import jwt from "jsonwebtoken";

connect();

export async function DELETE(
  req: NextRequest,
  { params }: { params: { userId: string; petId: string } }
) {
  try {
    const { userId, petId } = params;
    const token = req.cookies.get("token")?.value;

    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };
    if (decoded.id !== userId) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

    const deletedPet = await Pet.findOneAndDelete({ _id: petId, userId });

    if (!deletedPet) return NextResponse.json({ error: "Pet not found" }, { status: 404 });

    return NextResponse.json({ success: true, message: "Pet deleted successfully" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
