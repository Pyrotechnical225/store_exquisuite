import type Stripe from "stripe";
import { getDb } from "@/lib/db";
import { getStripe } from "@/lib/stripe";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const signature = request.headers.get("stripe-signature");
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!signature || !secret) return Response.json({ error: "Webhook is not configured" }, { status: 400 });
  let event: Stripe.Event;
  try { event = getStripe().webhooks.constructEvent(await request.text(), signature, secret); }
  catch { return Response.json({ error: "Invalid signature" }, { status: 400 }); }
  if (event.type === "checkout.session.completed" || event.type === "checkout.session.async_payment_succeeded") {
    const session = event.data.object;
    const userId = session.metadata?.userId;
    if (userId && session.payment_status === "paid") {
      const sql = getDb();
      await sql`INSERT INTO orders (user_id, stripe_session_id, payment_status, amount_total, currency, customer_email, paid_at)
        VALUES (${userId}, ${session.id}, 'paid', ${session.amount_total}, ${session.currency ?? "gbp"}, ${session.customer_details?.email ?? null}, NOW())
        ON CONFLICT (stripe_session_id) DO UPDATE SET payment_status = 'paid', amount_total = EXCLUDED.amount_total, currency = EXCLUDED.currency, customer_email = COALESCE(EXCLUDED.customer_email, orders.customer_email), paid_at = COALESCE(orders.paid_at, NOW())`;
      await sql`DELETE FROM cart_items WHERE user_id = ${userId}`;
    }
  }
  if (event.type === "checkout.session.async_payment_failed") {
    const session = event.data.object;
    const sql = getDb();
    await sql`UPDATE orders SET payment_status = 'failed' WHERE stripe_session_id = ${session.id}`;
  }
  return Response.json({ received: true });
}
