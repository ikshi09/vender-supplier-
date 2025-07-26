import { NextResponse } from "next/server";

export async function GET() {
  const offers = [
    {
      id: 1,
      title: "Fresh Vegetables Combo",
      description: "Mixed vegetables pack for daily street food needs",
      discountPercent: 25,
      originalPrice: 2000,
      finalPrice: 1500,
      supplierName: "GreenFarm Suppliers",
      category: "Vegetables",
      validUntil: "2025-12-31",
    },
    {
      id: 2,
      title: "Cooking Oil (15L Can)",
      description: "Refined sunflower oil, bulk pack",
      discountPercent: 18,
      originalPrice: 2400,
      finalPrice: 1968,
      supplierName: "HealthyOils Co.",
      category: "Oil",
      validUntil: "2025-11-30",
    },
    {
      id: 3,
      title: "Wheat Flour (50kg)",
      description: "Premium quality atta for rotis/parathas",
      discountPercent: 30,
      originalPrice: 3000,
      finalPrice: 2100,
      supplierName: "GrainHub Distributors",
      category: "Flour",
      validUntil: "2025-10-15",
    },
  ];

  return NextResponse.json(offers);
}
