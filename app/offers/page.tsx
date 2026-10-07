"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Percent, Popcorn, CreditCard, Ticket, Copy, Check } from "lucide-react";
import { OFFERS } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/SectionHeading";
import { useState } from "react";
import { toast } from "@/components/ui/toast";

const icons = [Percent, Popcorn, CreditCard, Ticket];

export default function OffersPage() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code).then(() => {
      setCopiedCode(code);
      toast("success", "Code copied", `Promo code ${code} copied to clipboard`);
      setTimeout(() => setCopiedCode(null), 2000);
    }).catch(() => {
      toast("info", "Promo code", code);
    });
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <SectionHeading
        title="Offers & Combos"
        subtitle="Exclusive deals to make your movie night even better"
        badge="Limited Time"
      />

      <div className="grid gap-6 sm:grid-cols-2">
        {OFFERS.map((offer, i) => {
          const Icon = icons[i % icons.length];
          return (
            <motion.div
              key={offer.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
              className="overflow-hidden rounded-2xl border border-cinema-border bg-cinema-card transition-all hover:border-cinema-gold/40 hover:shadow-xl hover:shadow-cinema-gold/10"
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={offer.imageUrl}
                  alt={offer.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-cinema-card via-cinema-card/40 to-transparent" />
                <div className="absolute top-4 right-4">
                  <Badge variant="gold" className="text-sm px-3 py-1">
                    {offer.discount}% OFF
                  </Badge>
                </div>
                <div className="absolute bottom-4 left-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cinema-gold/20 backdrop-blur-sm">
                    <Icon className="h-5 w-5 text-cinema-gold" />
                  </div>
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-lg font-bold text-white">{offer.title}</h3>
                <p className="mt-1 text-sm text-gray-400">{offer.description}</p>
                {offer.code && (
                  <div className="mt-4 flex items-center gap-2">
                    <div className="flex-1 rounded-lg border border-dashed border-cinema-gold/50 bg-cinema-gold/5 px-4 py-2.5">
                      <p className="text-xs text-gray-500">Promo Code</p>
                      <p className="font-mono font-bold text-cinema-gold">{offer.code}</p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleCopy(offer.code!)}
                      className="border-cinema-gold/50 text-cinema-gold hover:bg-cinema-gold/10"
                    >
                      {copiedCode === offer.code ? (
                        <Check className="h-4 w-4" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                      {copiedCode === offer.code ? "Copied" : "Copy"}
                    </Button>
                  </div>
                )}
                <Link href="/movies" className="mt-4 block">
                  <Button variant="secondary" className="w-full">
                    Avail Offer
                  </Button>
                </Link>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-10 rounded-2xl border border-cinema-border bg-cinema-card p-6">
        <h3 className="mb-3 font-bold text-white">How to Avail Offers</h3>
        <ol className="space-y-2 text-sm text-gray-400 list-decimal list-inside">
          <li>Select your movie and showtime</li>
          <li>Choose your seats and proceed to checkout</li>
          <li>Enter the promo code at the payment page</li>
          <li>Enjoy the discount on your total amount</li>
        </ol>
        <p className="mt-4 text-xs text-gray-500">
          * Offers are applicable on select shows and may vary. Demo offers are for presentation purposes.
        </p>
      </div>
    </div>
  );
}
