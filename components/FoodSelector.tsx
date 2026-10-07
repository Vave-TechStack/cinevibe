"use client";

import { useState } from "react";
import { Minus, Plus, UtensilsCrossed } from "lucide-react";
import { FoodItem, FoodOrderItem } from "@/lib/types";
import { formatINR } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface FoodSelectorProps {
  items: FoodItem[];
  selectedItems: FoodOrderItem[];
  onChange: (items: FoodOrderItem[]) => void;
}

export function FoodSelector({ items, selectedItems, onChange }: FoodSelectorProps) {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const categories = ["All", ...Array.from(new Set(items.map((i) => i.category)))];

  const filtered = activeCategory === "All"
    ? items
    : items.filter((i) => i.category === activeCategory);

  const getQuantity = (itemId: string) => {
    const found = selectedItems.find((i) => i.itemId === itemId);
    return found ? found.quantity : 0;
  };

  const updateQuantity = (item: FoodItem, delta: number) => {
    const current = getQuantity(item.id);
    const newQty = Math.max(0, current + delta);
    const updated = [...selectedItems];
    const existingIndex = updated.findIndex((i) => i.itemId === item.id);
    if (newQty === 0) {
      if (existingIndex >= 0) updated.splice(existingIndex, 1);
    } else if (existingIndex >= 0) {
      updated[existingIndex] = { ...updated[existingIndex], quantity: newQty };
    } else {
      updated.push({
        itemId: item.id,
        name: item.name,
        price: item.price,
        quantity: newQty,
      });
    }
    onChange(updated);
  };

  return (
    <div>
      <div className="mb-4 flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`rounded-lg px-4 py-2 text-sm font-semibold transition-all ${
              activeCategory === cat
                ? "bg-cinema-gold text-black"
                : "bg-white/5 text-gray-300 hover:bg-white/10"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {filtered.map((item) => {
          const qty = getQuantity(item.id);
          return (
            <div
              key={item.id}
              className="flex items-center gap-4 rounded-xl border border-cinema-border bg-cinema-card p-4 transition-all hover:border-cinema-gold/30"
            >
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-cinema-gold/20 to-yellow-600/10 overflow-hidden">
                <UtensilsCrossed className="h-7 w-7 text-cinema-gold" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-white">{item.name}</h4>
                <p className="text-xs text-gray-400 truncate">{item.description}</p>
                <p className="mt-1 text-sm font-bold text-cinema-gold">{formatINR(item.price)}</p>
              </div>
              <div className="flex items-center gap-2">
                {qty === 0 ? (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => updateQuantity(item, 1)}
                    className="border-cinema-gold/50 text-cinema-gold hover:bg-cinema-gold/10"
                  >
                    <Plus className="h-4 w-4" />
                    Add
                  </Button>
                ) : (
                  <div className="flex items-center gap-1 rounded-lg border border-cinema-gold/40 bg-cinema-gold/10 p-1">
                    <button
                      onClick={() => updateQuantity(item, -1)}
                      className="flex h-7 w-7 items-center justify-center rounded-md text-cinema-gold hover:bg-cinema-gold/20 transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-8 text-center text-sm font-bold text-white">{qty}</span>
                    <button
                      onClick={() => updateQuantity(item, 1)}
                      className="flex h-7 w-7 items-center justify-center rounded-md text-cinema-gold hover:bg-cinema-gold/20 transition-colors"
                      aria-label="Increase quantity"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {selectedItems.length > 0 && (
        <div className="mt-4 rounded-xl border border-cinema-gold/30 bg-cinema-gold/5 p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-gray-300">
              Food Total ({selectedItems.reduce((s, i) => s + i.quantity, 0)} items)
            </span>
            <span className="text-lg font-black text-cinema-gold">
              {formatINR(selectedItems.reduce((s, i) => s + i.price * i.quantity, 0))}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
