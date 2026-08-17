import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel.js"
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

connect()

export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json()
        const {username, email, password} = reqBody

        if (!username || !email || !password) {
            throw new Error("Please provide username, email and password")
        }

        const trimmedUsername = username.trim()
        const trimmedEmail = email.trim()

        if (trimmedUsername.length < 3) {
            throw new Error("Username must be at least 3 characters long")
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(trimmedEmail)) {
            throw new Error("Invalid email format")
        }

        if (password.length < 6) {
            throw new Error("Password must be at least 6 characters long")
        }

        console.log(reqBody);

        const user = await User.findOne({email})

        if(user){
            
        }
        

    } catch (error:any) {
        return NextResponse.json({error: error.message},{status: 500})
    }
}