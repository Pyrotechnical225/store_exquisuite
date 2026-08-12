import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getStripe } from "@/lib/stripe";

type SuccessPageProps = {
  searchParams: Promise<{ session_id?: string }>;
};

export default async function SuccessPage({ searchParams }: SuccessPageProps) {
  const { session_id: sessionId } = await searchParams;
  const { userId } = await auth();
  if (!userId) {
    const returnTo = sessionId ? `/checkout/success?session_id=${encodeURIComponent(sessionId)}` : "/checkout/success";
    redirect(`/sign-in?redirect_url=${encodeURIComponent(returnTo)}`);
  }

  let confirmed = false;

  if (sessionId) {
    try {
      const session = await getStripe().checkout.sessions.retrieve(sessionId);
      confirmed = session.metadata?.userId === userId && session.payment_status === "paid";
    } catch {
      confirmed = false;
    }
  }

  if (!confirmed) {
    return <section className="shell success"><p className="eyebrow dark">Payment status</p><h1>We’re confirming your order.</h1><p>Your payment has not yet been confirmed for this account. Check your Stripe receipt, or return to your bag and try again.</p><Link className="button" href="/cart">Return to your bag</Link></section>;
  }

  return <section className="shell success"><div className="success-mark">✓</div><p className="eyebrow dark">Order confirmed</p><h1>Thank you for your order.</h1><p>Your secure payment was received. Stripe will send the receipt to your email address, and we’ll prepare your order for UK delivery.</p><Link className="button" href="/">Continue shopping</Link></section>;
}
