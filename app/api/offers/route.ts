import { NextResponse } from "next/server"; 
export async function GET() { 
  const offers = [ 
    { id: 1, title: "Fresh Vegetables", description: "Discounted vegetables from local farms", discountPercent: 20, originalPrice: 100, finalPrice: 80, supplierName: "GreenFarm Suppliers", category: "Vegetables", validUntil: "2025-08-15" }, 
    { id: 2, title: "Fresh Fruits", description: "Organic seasonal fruits", discountPercent: 15, originalPrice: 200, finalPrice: 170, supplierName: "FruitLand Co.", category: "Fruits", validUntil: "2025-08-20" }, 
    { id: 3, title: "Spices", description: "Premium quality spices at a discount", discountPercent: 10, originalPrice: 150, finalPrice: 135, supplierName: "SpiceWorld", category: "Spices", validUntil: "2025-08-10" } 
  ]; 
  return NextResponse.json(offers); 
} 
