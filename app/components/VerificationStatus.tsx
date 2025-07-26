
"use client";

import { useEffect, useState } from "react";

export default function VerificationStatus() {
  const [status, setStatus] = useState<{ verified: boolean; message: string } | null>(null);

  useEffect(() => {
    fetch("/api/verify")
      .then((res) => res.json())
      .then((data) => setStatus(data))
      .catch((err) => console.error("Error fetching verification:", err));
  }, []);

  if (!status) return <p>Loading verification status...</p>;
  return <p>{status.verified ? `✅ ${status.message}` : "❌ Verification Required"}</p>;
}
