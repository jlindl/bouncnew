import type { Metadata } from "next";
import { Checkout } from "@/components/shop/Checkout";

export const metadata: Metadata = {
  title: "Checkout",
  robots: { index: false, follow: false },
};

export default function CheckoutPage() {
  return (
    <section className="pb-[clamp(5rem,10vw,9rem)] pt-[calc(var(--header-h)+clamp(2rem,5vw,4rem))]">
      <Checkout />
    </section>
  );
}
