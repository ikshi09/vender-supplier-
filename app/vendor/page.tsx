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
      body: JSON.stringi


