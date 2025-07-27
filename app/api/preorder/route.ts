import { NextResponse } from "next/server";

let preOrders: { productId: number; timestamp: string }[] = [];

export async function POST(req: Request) {
  const body = await req.json();
  const newOrder = {
    productId: body.productId,
    timestamp: new Date().toISOString(),
  };
  preOrders.push(newOrder);
  return NextResponse.json({ success: true, message: "Pre-order added", order: newOrder });
}

export async function GET() {
  return NextResponse.json(preOrders);
}
