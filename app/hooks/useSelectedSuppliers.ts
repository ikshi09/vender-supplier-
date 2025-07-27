"use client";

import { useState } from "react";
import type { Offer } from "@/components/OfferList";

export function useSelectedSuppliers() {
  const [selected, setSelected] = useState<Record<string, Offer>>({});

  const select = (category: string, offer: Offer) => {
    setSelected((prev) => ({ ...prev, [category]: offer }));
  };

  const clear = (category?: string) => {
    if (category) {
      const { [category]: _, ...rest } = selected;
      setSelected(rest);
    } else {
      setSelected({});
    }
  };

  return { selected, select, clear };
}
