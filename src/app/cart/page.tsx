import type { Metadata } from "next";
import { CartView } from "@/components/cart-view";
export const metadata: Metadata = { title: "Your bag" };
export default function CartPage() { return <section className="shell cart-page"><p className="eyebrow dark">Your account</p><h1>Shopping bag</h1><CartView /></section>; }
