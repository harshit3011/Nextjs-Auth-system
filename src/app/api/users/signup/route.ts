import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel.js";
import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import crypto from "crypto";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { username, email, password } = reqBody;

    if (!username || !email || !password) {
      throw new Error("Please provide username, email and password");
    }

    const trimmedUsername = username.trim();
    const trimmedEmail = email.trim();

    if (trimmedUsername.length < 3) {
      throw new Error("Username must be at least 3 characters long");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      throw new Error("Invalid email format");
    }

    if (password.length < 6) {
      throw new Error("Password must be at least 6 characters long");
    }

    const user = await User.findOne({ email: trimmedEmail });

    if (user) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const verifyToken = crypto.randomBytes(32).toString("hex");

    const newUser = new User({
      username: trimmedUsername,
      email: trimmedEmail,
      password: hashedPassword,
      verifyToken,
      verifyTokenExpiry: Date.now() + 60 * 60 * 1000,
    });

    const savedUser = await newUser.save();

    await sendVerificationEmail(trimmedEmail, verifyToken);

    return NextResponse.json({
      message: "A new user is created successfully. Please verify your email.",
      success: true,
      savedUser,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}