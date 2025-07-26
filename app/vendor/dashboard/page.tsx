"use client";

import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [status, setStatus] = useState<{ verified: boolean; message: string } | null>(null);

  useEffect(() => {
    fetch("/api/verify")
      .then((res) => res.json())
      .then((data) => setStatus(data))
      .catch((err) => console.error("Error fetching verification:", err));
  }, []);

  if (!status) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Supplier Dashboard</h1>
        <p>Loading verification status...</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Supplier Dashboard</h1>
      {status.verified ? (
        <div>
          <p className="text-green-600">✅ {status.message}</p>
          <div className="mt-6">
            <h2 className="text-xl font-semibold">Supplier Offers</h2>
            <p className="text-gray-700">
              Here you can access all the supplier offers after verification.
            </p>
          </div>
        </div>
      ) : (
        <p className="text-red-600">❌ Verification Required</p>
      )}
    </div>
  );
}
