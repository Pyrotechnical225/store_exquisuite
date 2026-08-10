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
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const userId = session.metadata?.userId;
    if (userId) {
      const sql = getDb();
      await sql`UPDATE orders SET payment_status = 'paid', amount_total = ${session.amount_total}, currency = ${session.currency ?? "gbp"}, paid_at = NOW() WHERE stripe_session_id = ${session.id}`;
      await sql`DELETE FROM cart_items WHERE user_id = ${userId}`;
    }
  }
  return Response.json({ received: true });
}
