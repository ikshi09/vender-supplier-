"use client";

import Link from "next/link";

export default function HomePage() {
  return (
    <div className="container mx-auto p-8 text-center">
      <h1 className="text-4xl font-bold mb-6">Welcome to Vendor Support</h1>
      <p className="text-gray-600 mb-6">
        Please log in as a Vendor or Supplier to access your dashboard.
      </p>
      <div className="flex justify-center gap-4">
        <Link
          href="/auth/login?type=vendor"
          className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Login as Vendor
        </Link>
        <Link
          href="/auth/login?type=supplier"
          className="px-6 py-3 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Login as Supplier
        </Link>
      </div>
    </div>
  );
}
