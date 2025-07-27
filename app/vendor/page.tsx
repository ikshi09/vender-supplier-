"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

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
  console.log("Build updated 🚀"); // Check Netlify build logs

  const [offers, setOffers] = useState<Offer[]>([]);
  const [loadingOffers, setLoadingOffers] = useState(true);

  useEffect(() => {
    fetch("/api/offers")
      .then((res) => res.json())
      .then((data) => {
        setOffers(data);
        setLoadingOffers(false);
      })
      .catch((err) => {
        console.error("Error fetching offers:", err);
        setLoadingOffers(false);
      });
  }, []);

  const handlePreOrder = (offer: Offer) => {
    fetch("/api/preorder", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId: offer.id, timestamp: new Date().toISOString() }),
    })
      .then(() => alert(`Pre-order placed for ${offer.title}`))
      .catch((err) => console.error("Pre-order failed:", err));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Build Update Banner */}
      <div className="mb-4 p-2 bg-yellow-300 text-black text-center rounded">
        🚀 Build Updated – {new Date().toLocaleTimeString()}
      </div>

      {/* Back to Home */}
      <div className="mb-4">
        <Link
          href="/"
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          ⬅ Back to Home
        </Link>
      </div>

      <h1 className="text-3xl font-bold mb-4">Supplier Offers</h1>

      {loadingOffers ? (
        <p>Loading offers...</p>
      ) : offers.length > 0 ? (
        <div className="grid md:grid-cols-3 gap-6">
          {offers.map((offer) => (
            <Card key={offer.id} className="p-4 shadow-lg">
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
                <p className="text-sm">Supplier: {offer.supplierName}</p>
                <p className="text-xs text-gray-400">Valid until: {offer.validUntil}</p>
                <button
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  onClick={() => handlePreOrder(offer)}
                >
                  Pre-order
                </button>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <p>No offers available at the moment.</p>
      )}
    </div>
  );
}
// Force rebuild 27-07-2025 14:41:41.89 
