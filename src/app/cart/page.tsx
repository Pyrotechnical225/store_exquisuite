import type { Metadata } from "next";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { CartView } from "@/components/cart-view";

export const metadata: Metadata = { title: "Your bag" };

export default async function CartPage() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in?redirect_url=/cart");

  return <section className="shell cart-page"><p className="eyebrow dark">Your account</p><h1>Shopping bag</h1><CartView /></section>;
}
