 
"use client";

import { useEffect, useState } from "react";

export default function VerificationStatus() {
  const [status, setStatus] = useState<{ verified: boolean; message: string } | null>(null);

  useEffect(() => {
    fetch("/api/verify")
      .then((res) => res.json())
      .then((data) => setStatus(data))
      .catch(() => setStatus({ verified: false, message: "Verification check failed" }));
  }, []);

  if (!status) return <p>Loading verification status...</p>;

  return (
    <div>
      {status.verified ? (
        <p style={{ color: "green" }}>✅ {status.message}</p>
      ) : (
        <p style={{ color: "red" }}>❌ Verification Required</p>
      )}
    </div>
  );
}
