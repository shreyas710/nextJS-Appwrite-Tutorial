import {connect} from '@/dbConfig/dbConfig';
import Blog from '@/models/blogModel';
import { NextResponse } from 'next/server';

connect();

export async function GET() {
    try {
        const blogs = await Blog.find();
        return NextResponse.json(blogs);
    } catch (error: any) {
        console.log("Error getting blogs", error);
        return NextResponse.json({error: error.message, status: 500});
    }
}