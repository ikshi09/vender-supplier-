import { NextResponse } from "next/server"; 
let preOrders: { productId: number; timestamp: string }[] = []; 
export async function POST(req: Request) { 
  const body = await req.json(); 
  preOrders.push({ productId: body.productId, timestamp: body.timestamp }); 
  return NextResponse.json({ success: true, message: "Pre-order placed successfully" }); 
} 
export async function GET() { 
  return NextResponse.json(preOrders); 
} 
