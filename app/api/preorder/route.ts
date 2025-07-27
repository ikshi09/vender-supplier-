
import { NextResponse } from "next/server";
import type { Offer } from "@/components/OfferList";

// In-memory store of pre-orders
type PreOrder = {
  offer: Offer;
  timestamp: string;
};

let preOrders: PreOrder[] = [];

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const offer: Offer = body.offer;
    const timestamp = body.timestamp ?? new Date().toISOString();

    if (!offer || !offer.id) {
      return NextResponse.json(
        { success: false, message: "Invalid offer data" },
        { status: 400 }
      );
    }

    const newOrder: PreOrder = { offer, timestamp };
    preOrders.push(newOrder);

    return NextResponse.json({
      success: true,
      message: "Pre-order placed successfully",
      order: newOrder,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to place pre-order" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(preOrders);
}
