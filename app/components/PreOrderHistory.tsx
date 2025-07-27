""use client";

import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface PreOrder {
  productId: number;
  timestamp: string;
}

export default function PreOrderHistory() {
  const [orders, setOrders] = useState<PreOrder[]>([]);

  useEffect(() => {
    fetch("/api/preorder")
      .then((res) => res.json())
      .then((data) => setOrders(data));
  }, []);

  return (
    <div className="mt-6">
      <h2 className="text-xl font-bold mb-4">Pre-Order History</h2>
      {orders.length === 0 ? (
        <p>No pre-orders yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {orders.map((order, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>Product ID: {order.productId}</CardTitle>
              </CardHeader>
              <CardContent>
                Ordered on: {new Date(order.timestamp).toLocaleString()}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
