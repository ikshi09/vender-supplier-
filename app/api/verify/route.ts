import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    verified: true,
    message: "User verification successful",
  });
}

export async function POST() {
  return NextResponse.json({
    verified: true,
    message: "Document verified successfully",
  });
}
