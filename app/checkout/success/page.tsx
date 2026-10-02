import type { Metadata } from "next";
import { OrderSuccess } from "@/components/shop/OrderSuccess";

export const metadata: Metadata = {
  title: "Order confirmed",
  robots: { index: false, follow: false },
};

export default function OrderSuccessPage() {
  return (
    <section className="pb-[clamp(5rem,10vw,9rem)] pt-[calc(var(--header-h)+clamp(2rem,5vw,4rem))]">
      <OrderSuccess />
    </section>
  );
}
