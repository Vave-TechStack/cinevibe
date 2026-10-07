"use client";

import { useState } from "react";
import { Smartphone, CreditCard, Landmark, Wallet, Lock, ShieldCheck } from "lucide-react";
import { PaymentMethod } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface PaymentMethodProps {
  selected: PaymentMethod;
  onSelect: (method: PaymentMethod) => void;
  onPay: () => void;
  amount: number;
  processing?: boolean;
}

const methods = [
  { id: "UPI" as PaymentMethod, label: "UPI", icon: Smartphone, description: "GPay, PhonePe, Paytm" },
  { id: "CARD" as PaymentMethod, label: "Card", icon: CreditCard, description: "Credit / Debit" },
  { id: "NET_BANKING" as PaymentMethod, label: "Net Banking", icon: Landmark, description: "All major banks" },
  { id: "WALLET" as PaymentMethod, label: "Wallet", icon: Wallet, description: "Paytm, Amazon Pay" },
];

export function PaymentMethodSelector({
  selected,
  onSelect,
  onPay,
  amount,
  processing = false,
}: PaymentMethodProps) {
  const [upiId, setUpiId] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [bank, setBank] = useState("");
  const [wallet, setWallet] = useState("");

  const canPay = () => {
    switch (selected) {
      case "UPI":
        return upiId.trim().length >= 4;
      case "CARD":
        return cardNumber.replace(/\s/g, "").length >= 16 && cardName.trim().length >= 2 && cardExpiry.length >= 5 && cardCvv.length >= 3;
      case "NET_BANKING":
        return bank.trim().length >= 2;
      case "WALLET":
        return wallet.trim().length >= 2;
      default:
        return false;
    }
  };

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-yellow-500/30 bg-yellow-500/5 p-4 flex items-start gap-3">
        <ShieldCheck className="h-5 w-5 text-yellow-400 shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-semibold text-yellow-200">Demo Payment Mode</p>
          <p className="text-xs text-gray-400 mt-0.5">
            This is a demonstration payment. No real money will be charged. Use any test details.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {methods.map((method) => (
          <button
            key={method.id}
            onClick={() => onSelect(method.id)}
            className={cn(
              "flex flex-col items-center gap-2 rounded-xl border p-4 transition-all",
              selected === method.id
                ? "border-cinema-gold bg-cinema-gold/10 text-cinema-gold"
                : "border-cinema-border bg-cinema-card text-gray-300 hover:border-cinema-gold/40 hover:bg-white/5"
            )}
          >
            <method.icon className="h-6 w-6" />
            <span className="text-sm font-bold">{method.label}</span>
            <span className="text-[10px] text-gray-500 text-center">{method.description}</span>
          </button>
        ))}
      </div>

      <div className="rounded-xl border border-cinema-border bg-cinema-card p-5">
        {selected === "UPI" && (
          <div className="space-y-4">
            <p className="text-sm text-gray-400">Enter your UPI ID</p>
            <Input
              placeholder="yourname@upi"
              value={upiId}
              onChange={(e) => setUpiId(e.target.value)}
            />
            <div className="flex flex-wrap gap-2">
              {["gpay", "phonepe", "paytm"].map((app) => (
                <button
                  key={app}
                  onClick={() => setUpiId(`demo@${app}`)}
                  className="rounded-lg border border-cinema-border px-3 py-1.5 text-xs text-gray-300 hover:border-cinema-gold/50 hover:text-cinema-gold transition-colors"
                >
                  @{app}
                </button>
              ))}
            </div>
          </div>
        )}

        {selected === "CARD" && (
          <div className="space-y-4">
            <Input
              label="Card Number"
              placeholder="4111 1111 1111 1111"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              maxLength={19}
            />
            <Input
              label="Name on Card"
              placeholder="John Doe"
              value={cardName}
              onChange={(e) => setCardName(e.target.value)}
            />
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Expiry (MM/YY)"
                placeholder="12/28"
                value={cardExpiry}
                onChange={(e) => setCardExpiry(e.target.value)}
                maxLength={5}
              />
              <Input
                label="CVV"
                placeholder="123"
                type="password"
                value={cardCvv}
                onChange={(e) => setCardCvv(e.target.value)}
                maxLength={4}
              />
            </div>
          </div>
        )}

        {selected === "NET_BANKING" && (
          <div className="space-y-4">
            <p className="text-sm text-gray-400">Select your bank</p>
            <div className="grid grid-cols-2 gap-2">
              {["HDFC Bank", "SBI", "ICICI Bank", "Axis Bank", "Kotak", "Punjab National Bank"].map((b) => (
                <button
                  key={b}
                  onClick={() => setBank(b)}
                  className={cn(
                    "rounded-lg border p-3 text-sm font-medium transition-all",
                    bank === b
                      ? "border-cinema-gold bg-cinema-gold/10 text-cinema-gold"
                      : "border-cinema-border text-gray-300 hover:border-cinema-gold/40"
                  )}
                >
                  {b}
                </button>
              ))}
            </div>
          </div>
        )}

        {selected === "WALLET" && (
          <div className="space-y-4">
            <p className="text-sm text-gray-400">Select wallet</p>
            <div className="grid grid-cols-2 gap-2">
              {["Paytm Wallet", "Amazon Pay", "PhonePe Wallet", "MobiKwik"].map((w) => (
                <button
                  key={w}
                  onClick={() => setWallet(w)}
                  className={cn(
                    "rounded-lg border p-3 text-sm font-medium transition-all",
                    wallet === w
                      ? "border-cinema-gold bg-cinema-gold/10 text-cinema-gold"
                      : "border-cinema-border text-gray-300 hover:border-cinema-gold/40"
                  )}
                >
                  {w}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <Button
        onClick={onPay}
        disabled={!canPay() || processing}
        className="w-full h-14 text-lg"
        size="lg"
      >
        {processing ? (
          <>
            <span className="h-5 w-5 animate-spin rounded-full border-2 border-black/30 border-t-black" />
            Processing Payment...
          </>
        ) : (
          <>
            <Lock className="h-5 w-5" />
            Pay {amount.toLocaleString("en-IN", { style: "currency", currency: "INR" })}
          </>
        )}
      </Button>

      <p className="flex items-center justify-center gap-1.5 text-center text-xs text-gray-500">
        <Lock className="h-3 w-3" />
        256-bit SSL encrypted • PCI-DSS compliant (demo)
      </p>
    </div>
  );
}
