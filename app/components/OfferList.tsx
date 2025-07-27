"use client";

import React from "react";

export interface Offer {
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

interface OfferListProps {
  offers: Offer[];
  loading: boolean;
}

export default function OfferList({ offers, loading }: OfferListProps) {
  if (loading) return <p>Loading offers...</p>;
  if (!offers.length) return <p>No offers available.</p>;

  return (
    <ul className="space-y-4">
      {offers.map((offer) => (
        <li key={offer.id} className="border p-4 rounded shadow-sm">
          <h3 className="text-xl font-bold">{offer.title}</h3>
          <p>{offer.description}</p>
          <p>
            <strong>Discount:</strong> {offer.discountPercent}%
          </p>
          <p>
            <strong>Price:</strong> ₹{offer.finalPrice}{" "}
            <span className="line-through text-gray-500">₹{offer.originalPrice}</span>
          </p>
          <p>
            <strong>Supplier:</strong> {offer.supplierName}
          </p>
          <p>
            <strong>Category:</strong> {offer.category}
          </p>
          <p>
            <strong>Valid Until:</strong> {offer.validUntil}
          </p>
        </li>
      ))}
    </ul>
  );
}
