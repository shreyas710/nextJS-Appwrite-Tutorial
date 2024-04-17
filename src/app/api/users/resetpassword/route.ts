import {connect} from '@/dbConfig/dbConfig';
import { NextRequest, NextResponse } from 'next/server';
import User from '@/models/userModel';
import bcryptjs from 'bcryptjs';

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { token, password } = reqBody;
        console.log(token, password);
        
        const user = await User.findOne({forgotPasswordToken: token, forgotPasswordTokenExpiry: {$gt: Date.now()}});

        if(!user) {
            return NextResponse.json({message: "Invalid or expired token", status: 400});
        }

        console.log(user);

        const salt = await bcryptjs.genSalt(10);
        const hashPassword = await bcryptjs.hash(password, salt);

        user.password = hashPassword;
        user.forgotPasswordToken = undefined;
        user.forgotPasswordTokenExpiry = undefined;

        await user.save();

        return NextResponse.json({message: "Password reset successfully", status: 200});
    } catch (error: any) {
        console.log("Error resetting password", error.message);
        return NextResponse.json({message: "Error resetting password", status: 500});
    }
}
