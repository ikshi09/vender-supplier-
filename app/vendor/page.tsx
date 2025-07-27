"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import OfferList, { Offer } from "../components/OfferList";

export default function VendorDashboard() {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [loadingOffers, setLoadingOffers] = useState(true);

  useEffect(() => {
    fetch("/api/offers")
      .then((res) => res.json())
      .then((data) => {
        setOffers(data);
        setLoadingOffers(false);
      })
      .catch(() => {
        setLoadingOffers(false);
      });
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-4">
        <Link href="/" className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
          ⬅ Back to Home
        </Link>
      </div>

      <h1 className="text-3xl font-bold mb-2 text-green-600">✅ Vendor Verified</h1>
      <h2 className="text-2xl font-semibold mb-6">Supplier Offers</h2>

      <OfferList offers={offers} loading={loadingOffers} />
    </div>
  );
}
