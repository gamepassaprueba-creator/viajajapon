"use client";

import { useYenRate } from "@/lib/hooks/useYenRate";

export function HomeYenChip() {
  const { rate } = useYenRate();
  return <p className="nums mt-0.5 font-mono text-base font-black text-[#0a0a0a] lg:text-xl">¥{rate}</p>;
}

export function HomeYenBullet() {
  const { rate } = useYenRate();
  return <>1€ ≈ ¥{rate} ahora</>;
}

export function JrPassPriceBullet() {
  const { rate } = useYenRate();
  const price = Math.round(50000 / rate);
  return <>Desde ¥50.000 (~{price}€)</>;
}
