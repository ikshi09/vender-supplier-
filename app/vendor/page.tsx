"use client";

import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Offer {
  id: number;
  title: string;
  description: string;
  discountPercent: number;
  originalPrice: number;
  finalPrice: number;
  supplierName: string;
  category: string;
  validUntil: string;
}

export default function VendorDashboard() {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);

  useEffect(() => {
    setOffers([
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
    ]);
  }, []);

  const handleSelect = (offer: Offer) => {
    setSelectedOffer(offer);
  };

  const calculateProfit = (offer: Offer) => {
    // Assuming profit is calculated as Original Price - Final Price
    return offer.originalPrice - offer.finalPrice;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Vendor Dashboard</h1>

      {!selectedOffer ? (
        <>
          <h2 className="text-2xl font-semibold mb-4">Available Products</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {offers.map((offer) => (
              <Card key={offer.id}>
                <CardHeader>
                  <CardTitle>{offer.title}</CardTitle>
                  <CardDescription>{offer.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>
                    <span className="line-through text-gray-500">₹{offer.originalPrice}</span>{" "}
                    <span className="text-green-600 font-bold">₹{offer.finalPrice}</span>
                  </p>
                  <p className="text-sm text-gray-500">{offer.discountPercent}% OFF</p>
                  <Button className="mt-4 w-full" onClick={() => handleSelect(offer)}>
                    View Supplier
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      ) : (
        <>
          <h2 className="text-2xl font-semibold mb-4">Supplier Details</h2>
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>{selectedOffer.title}</CardTitle>
              <CardDescription>{selectedOffer.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Supplier: {selectedOffer.supplierName}</p>
              <p>
                Price: <span className="text-green-600 font-bold">₹{selectedOffer.finalPrice}</span>
              </p>
              <p>Valid until: {selectedOffer.validUntil}</p>
              <Button className="mt-4">Pre-Order</Button>
            </CardContent>
          </Card>

          {/* Profit and Loss Section */}
          <Card className="mb-6 bg-gray-50">
            <CardHeader>
              <CardTitle>Profit & Loss Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Original Price: ₹{selectedOffer.originalPrice}</p>
              <p>Discounted Price: ₹{selectedOffer.finalPrice}</p>
              <p className="text-green-600 font-bold">
                Savings (Profit): ₹{calculateProfit(selectedOffer)}
              </p>
            </CardContent>
          </Card>

          <Button variant="outline" onClick={() => setSelectedOffer(null)}>
            Back to Products
          </Button>
        </>
      )}
    </div>
  );
}
