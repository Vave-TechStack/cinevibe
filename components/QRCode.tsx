"use client";

import QRCodeLib from "qrcode";
import { useEffect, useRef } from "react";

interface QRCodeProps {
  value: string;
  size?: number;
  className?: string;
}

export function QRCode({ value, size = 200, className }: QRCodeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    QRCodeLib.toCanvas(canvasRef.current, value, {
      width: size,
      margin: 1,
      color: {
        dark: "#0D1117",
        light: "#FFFFFF",
      },
    }).catch(() => {});
  }, [value, size]);

  return (
    <div className={className}>
      <canvas ref={canvasRef} />
    </div>
  );
}
