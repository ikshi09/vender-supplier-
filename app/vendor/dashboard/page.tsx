"use client";

import { useEffect, useState } from "react";
import type { Offer } from "@/components/OfferList";
import Link from "next/link";

export default function VendorDashboard() {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [loadingOffers, setLoadingOffers] = useState(true);
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);
  const [preOrders, setPreOrders] = useState<any[]>([]); // Pre-orders list

  // Fetch all offers
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

    fetchPreOrders();
  }, []);

  // Fetch placed pre-orders
  const fetchPreOrders = async () => {
    try {
      const res = await fetch("/api/preorder");
      if (!res.ok) throw new Error("Failed to fetch pre-orders");
      const data = await res.json();
      setPreOrders(data);
    } catch (err) {
      console.error("Error fetching pre-orders:", err);
    }
  };

  // Handle Pre-Order
  const handlePreOrder = async () => {
    if (!selectedOffer) {
      alert("Please select an offer first!");
      return;
    }

    try {
      const response = await fetch("/api/preorder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          offer: selectedOffer,  // sending the full offer object here
          timestamp: new Date().toISOString(),
        }),
      });

      if (!response.ok) throw new Error("Failed to place pre-order");
      const result = await response.json();
      alert(result.message);
      fetchPreOrders(); // Refresh pre-orders
    } catch (error) {
      console.error("Pre-order error:", error);
      alert("Something went wrong while placing pre-order.");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-4">
        <Link href="/" className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
          ⬅ Back to Home
        </Link>
      </div>

      <h1 className="text-3xl font-bold mb-6 text-green-600">✅ Vendor Dashboard</h1>

      {loadingOffers ? (
        <p>Loading offers...</p>
      ) : offers.length === 0 ? (
        <p>No offers available at the moment.</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-4">
          {offers.map((offer) => (
            <div
              key={offer.id}
              onClick={() => setSelectedOffer(offer)}
              className={`border p-4 rounded shadow-sm cursor-pointer transition ${
                selectedOffer?.id === offer.id ? "border-green-500 ring-2" : "hover:shadow-lg"
              }`}
            >
              <h3 className="font-bold text-lg">{offer.title}</h3>
              <p className="text-sm">{offer.description}</p>
              <p>
                <span className="line-through text-gray-500">₹{offer.originalPrice}</span>{" "}
                <span className="text-green-600 font-bold">₹{offer.finalPrice}</span>
              </p>
              <p className="text-xs text-gray-500">Supplier: {offer.supplierName}</p>
              <p className="text-xs text-gray-400">Valid until: {offer.validUntil}</p>
            </div>
          ))}
        </div>
      )}

      {/* Pre-Order Button */}
      {selectedOffer && (
        <div className="mt-6">
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={handlePreOrder}
          >
            Pre-Order Selected
          </button>
        </div>
      )}

      {/* Placed Pre-Orders */}
      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-4">Placed Pre-Orders</h2>
        {preOrders.length === 0 ? (
          <p className="text-gray-600 text-sm">No pre-orders placed yet.</p>
        ) : (
          <ul className="space-y-3">
            {preOrders.map((order, idx) => (
              <li key={idx} className="border p-3 rounded shadow-sm bg-white">
                <p><strong>Product ID:</strong> {order.offer.id}</p>
                <p><strong>Title:</strong> {order.offer.title}</p>
                <p><strong>Placed At:</strong> {new Date(order.timestamp).toLocaleString()}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
