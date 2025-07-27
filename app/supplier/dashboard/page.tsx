"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { Offer } from "@/components/OfferList";

type PreOrder = {
  productId: number;
  timestamp: string;
};

export default function SupplierDashboard() {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState<Array<{ offer: Offer; timestamp: string }>>([]);

  // If later you add supplier auth, set this to the logged-in supplier's name
  const supplierNameFilter: string | null = null; // e.g. "FruitLand Co."

  useEffect(() => {
    const run = async () => {
      try {
        setLoading(true);

        // 1) Get all pre-orders
        const preOrdersRes = await fetch("/api/preorder");
        const preOrders: PreOrder[] = await preOrdersRes.json();

        if (!preOrders.length) {
          setItems([]);
          setLoading(false);
          return;
        }

        // 2) Get offers to map productId -> offer details
        const offersRes = await fetch("/api/offers");
        const offers: Offer[] = await offersRes.json();

        const offersById = new Map<number, Offer>();
        offers.forEach((o) => offersById.set(o.id, o));

        // 3) Join pre-orders with offers
        const joined = preOrders
          .map((po) => {
            const offer = offersById.get(po.productId);
            if (!offer) return null;
            if (supplierNameFilter && offer.supplierName !== supplierNameFilter) return null;
            return { offer, timestamp: po.timestamp };
          })
          .filter((x): x is { offer: Offer; timestamp: string } => !!x);

        setItems(joined);
      } catch (e) {
        console.error("Error loading supplier dashboard", e);
        setItems([]);
      } finally {
        setLoading(false);
      }
    };

    run();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-4">
        <Link href="/" className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
          ⬅ Back to Home
        </Link>
      </div>

      <h1 className="text-3xl font-bold mb-6 text-green-600">Supplier Dashboard</h1>

      {loading ? (
        <p>Loading pre-orders...</p>
      ) : items.length === 0 ? (
        <p className="text-gray-600">No pre-orders yet.</p>
      ) : (
        <div className="space-y-4">
          {items.map(({ offer, timestamp }, idx) => (
          <div key={`${offer.id}-${timestamp}-${idx}`} className="border p-4 rounded shadow-sm bg-white">
              <h3 className="font-bold text-lg">{offer.title}</h3>
              <p className="text-sm text-gray-700">{offer.description}</p>

              <div className="mt-2 text-sm">
                <p>
                  <strong>Category:</strong> {offer.category}
                </p>
                <p>
                  <strong>Supplier:</strong> {offer.supplierName}
                </p>
                <p>
                  <strong>Market Price:</strong>{" "}
                  <span className="line-through text-gray-500">₹{offer.originalPrice}</span>
                </p>
                <p>
                  <strong>Discounted Price:</strong>{" "}
                  <span className="text-green-600 font-semibold">₹{offer.finalPrice}</span>
                </p>
                <p>
                  <strong>Valid Until:</strong> {offer.validUntil}
                </p>
                <p>
                  <strong>Pre-ordered At:</strong> {new Date(timestamp).toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
