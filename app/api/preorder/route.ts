import { NextResponse } from "next/server";

type PreOrder = { productId: number; timestamp: string };
let preOrders: PreOrder[] = [];

export async function POST(req: Request) {
  const body = await req.json();
  const order: PreOrder = {
    productId: body.productId,
    timestamp: body.timestamp ?? new Date().toISOString(),
  };
  preOrders.push(order);

  return NextResponse.json({
    success: true,
    message: "Pre-order placed successfully",
    order,
  });
}

export async function GET() {
  return NextResponse.json(preOrders);
}
