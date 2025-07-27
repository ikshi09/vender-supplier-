import VerificationStatus from "./VerificationStatus";

export default function HomePage() {
  return (
    <div>
      <h1>Welcome to Supplier Offers</h1>
      <VerificationStatus />
    </div>
  );
}
"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import PreOrderHistory from "./PreOrderHistory";

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
  const [status, setStatus] = useState<{ verified: boolean; message: string } | null>(null);
  const [offers, setOffers] = useState<Offer[]>([]);
  const [loadingOffers, setLoadingOffers] = useState(false);
  const [profitLoss, setProfitLoss] = useState<string | null>(null);

  // Fetch verification status
  useEffect(() => {
    fetch("/api/verify")
      .then((res) => res.json())
      .then((data) => setStatus(data))
      .catch((err) => console.error("Error fetching verification:", err));
  }, []);

  // Fetch offers if verified
  useEffect(() => {
    if (status?.verified) {
      setLoadingOffers(true);
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
    }
  }, [status]);

  // Pre-order handler
  const handlePreOrder = (offer: Offer) => {
    const profit = offer.originalPrice - offer.finalPrice;
    setProfitLoss(
      `If you buy from supplier "${offer.supplierName}", you save ₹${profit} compared to market price.`
    );

    // Store order in dummy API (or localStorage as simulation)
    const order = { productId: offer.id, timestamp: new Date().toISOString() };
    const existingOrders = JSON.parse(localStorage.getItem("preOrders") || "[]");
    existingOrders.push(order);
    localStorage.setItem("preOrders", JSON.stringify(existingOrders));
    alert(`Pre-order placed for ${offer.title}!`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Supplier Dashboard</h1>

      {status === null ? (
        <p>Loading verification status...</p>
      ) : status.verified ? (
        <>
          <p className="text-green-600 mb-4">✅ {status.message}</p>
          <h2 className="text-2xl font-bold mb-4">Supplier Offers</h2>
          {loadingOffers ? (
            <p>Loading offers...</p>
          ) : offers.length > 0 ? (
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
                    <p className="text-sm">Supplier: {offer.supplierName}</p>
                    <p className="text-xs text-gray-400">Valid until: {offer.validUntil}</p>
                    <Button className="mt-3 w-full" onClick={() => handlePreOrder(offer)}>
                      Pre-Order
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <p>No offers available at the moment.</p>
          )}
          {profitLoss && <p className="mt-6 text-blue-600 font-semibold">{profitLoss}</p>}
          <PreOrderHistory />
        </>
      ) : (
        <p className="text-red-600 mb-4">❌ Verification Required - Please upload your document.</p>
      )}
    </div>
  );
}
