import { connect } from "@/dbSetup/dbSetup";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { sendWelcomeEmail } from "@/lib/mailer";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { name, email, mobile, password } = reqBody;

    if (!name || !email || !mobile || !password) {
      return NextResponse.json({ error: "Please fill all the fields" }, { status: 400 });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ name, email, mobile, password: hashedPassword });
    const savedUser = await newUser.save();

    (async () => {
      try {
        await sendWelcomeEmail(savedUser.email, savedUser.name);
        console.log(`Welcome email sent to ${savedUser.email}`);
      } catch (err) {
        console.error("Failed to send welcome email:", err);
      }
    })();

    const tokenData = {
      id: savedUser._id,
      name: savedUser.name,
      email: savedUser.email,
      mobile: savedUser.mobile,
    };

    const token = jwt.sign(tokenData, process.env.JWT_SECRET!, { expiresIn: "1d" });

    const response = NextResponse.json(
      {
        message: "User registered successfully",
        success: true,
        user: {
          id: savedUser._id.toString(),
          name: savedUser.name,
          email: savedUser.email,
        },
      },
      { status: 200 }
    );

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 24 * 60 * 60,
    });

    return response;
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
