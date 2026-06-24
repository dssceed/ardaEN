import { NextResponse } from 'next/server';

export async function GET() {
    return NextResponse.json({
        status: "success",
        message: "Hello! API from Next.js in Docker is working"
    });
}