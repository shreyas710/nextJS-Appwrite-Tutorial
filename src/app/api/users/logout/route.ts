import { NextResponse } from "next/server";

export async function GET() {
    try {
        const response = NextResponse.json({message: "Logged out successfully", success: true, status: 200});
        response.cookies.set('token', '', {
            httpOnly: true
        });
        return response;
    } catch(error: any) {
        console.log("Error logging out", error);
        return NextResponse.json({error: error.message, status: 500});
    
    }
}