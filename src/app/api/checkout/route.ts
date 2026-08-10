import { auth, currentUser } from "@clerk/nextjs/server";
import { readCart } from "@/lib/cart";
import { getDb } from "@/lib/db";
import { getStripe } from "@/lib/stripe";

export async function POST(request: Request) {
  const { userId } = await auth();
  if (!userId) return Response.json({ error: "Sign in required" }, { status: 401 });
  const [items, user] = await Promise.all([readCart(userId), currentUser()]);
  if (!items.length) return Response.json({ error: "Your bag is empty" }, { status: 400 });
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? new URL(request.url).origin;
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const stripe = getStripe();
  const session = await stripe.checkout.sessions.create({
    integration_identifier: "exquisuite_hqmvzsjt",
    mode: "payment",
    customer_email: user?.primaryEmailAddress?.emailAddress,
    line_items: [
      ...items.map((item) => ({ quantity: item.quantity, price_data: { currency: "gbp", unit_amount: item.product.price, product_data: { name: item.product.name, description: `${item.product.brand} · ${item.size}`, images: [item.product.image], metadata: { productId: item.product.id, size: item.size } } } })),
      ...(subtotal < 10000 ? [{ quantity: 1, price_data: { currency: "gbp", unit_amount: 495, product_data: { name: "UK delivery" } } }] : []),
    ],
    shipping_address_collection: { allowed_countries: ["GB"] },
    billing_address_collection: "required",
    phone_number_collection: { enabled: true },
    metadata: { userId },
    success_url: `${appUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${appUrl}/cart`,
  });
  const sql = getDb();
  await sql`INSERT INTO orders (user_id, stripe_session_id, payment_status, customer_email) VALUES (${userId}, ${session.id}, 'pending', ${user?.primaryEmailAddress?.emailAddress ?? null}) ON CONFLICT (stripe_session_id) DO NOTHING`;
  return Response.json({ url: session.url });
}
