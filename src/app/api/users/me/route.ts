import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import User from "@/models/userModel";
import {connect} from "@/dbConfig/dbConfig";

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