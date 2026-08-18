import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel.js"
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"

connect()

export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json()
        const {email, password} = reqBody

        if (!email || !password) {
            throw new Error("Please provide email and password")
        }

        const trimmedEmail = email.trim()

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(trimmedEmail)) {
            throw new Error("Invalid email format")
        }

        if (password.length < 6) {
            throw new Error("Password must be at least 6 characters long")
        }

        console.log(reqBody);

        const user = await User.findOne({email: trimmedEmail})

        if(!user){
            return NextResponse.json({error: "User does not exist"}, {status: 400})
        }

        // password comparison
        const isPasswordValid = await bcrypt.compare(password, user.password)

        if(!isPasswordValid){
            return NextResponse.json({error: "Invalid password"}, {status: 400})
        }

        console.log(user);

        const tokenData = {
            id:user._id,
            username : user.username,
            email : user.email
        }

        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn: "1d"})

        const response = NextResponse.json({
            message: "Login successful",
            success: true,
        })
        response.cookies.set("token", token, {
            httpOnly: true
        })
        return response

    } catch (error:any) {
        return NextResponse.json({error: error.message},{status: 500})
    }
}