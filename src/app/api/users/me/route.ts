import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import User from "@/models/userModel";
import {connect} from "@/dbConfig/dbConfig";
import sendEmail from "@/helpers/mailer";

connect();

export async function GET(request: NextRequest) {
    try {
        const userId = await getDataFromToken(request);
        const user = await User.findById(userId).select("-password");

        return NextResponse.json({
            message: "User data fetched successfully",
            user, 
            status: 200
        });
    } catch(error: any) {
        console.log("Error getting user data", error);
        return NextResponse.json({error: error.message, status: 500});
    }
}

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { email } = reqBody;
        const user = await User.findOne({email: email}).select("-password");
        console.log(user);
        if(!user) {
            return NextResponse.json({
                message: "User not found",
                status: 404
            });
        }

        await sendEmail({email, emailType: "RESET", userId: user._id});

        return NextResponse.json({
            message: "User data fetched successfully",
            user, 
            status: 200
        });
    } catch(error: any) {
        console.log("Error getting user data", error);
        return NextResponse.json({error: error.message, status: 500});
    }
}