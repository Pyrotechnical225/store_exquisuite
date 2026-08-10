import { auth } from "@clerk/nextjs/server";
import { getDb } from "@/lib/db";
import { productMap } from "@/lib/products";
import { readCart } from "@/lib/cart";

export async function GET() {
  const { userId } = await auth();
  if (!userId) return Response.json({ error: "Sign in required" }, { status: 401 });
  return Response.json({ items: await readCart(userId) });
}

export async function POST(request: Request) {
  const { userId } = await auth();
  if (!userId) return Response.json({ error: "Sign in required" }, { status: 401 });
  const body = await request.json() as { productId?: string; size?: string; quantity?: number };
  const product = body.productId ? productMap.get(body.productId) : undefined;
  const quantity = Math.max(1, Math.min(10, Number(body.quantity) || 1));
  if (!product || !body.size || !product.sizes.includes(body.size)) return Response.json({ error: "Invalid product selection" }, { status: 400 });
  const sql = getDb();
  await sql`INSERT INTO cart_items (user_id, product_id, size, quantity) VALUES (${userId}, ${product.id}, ${body.size}, ${quantity}) ON CONFLICT (user_id, product_id, size) DO UPDATE SET quantity = LEAST(10, cart_items.quantity + ${quantity}), updated_at = NOW()`;
  return Response.json({ ok: true }, { status: 201 });
}

export async function DELETE(request: Request) {
  const { userId } = await auth();
  if (!userId) return Response.json({ error: "Sign in required" }, { status: 401 });
  const body = await request.json() as { productId?: string; size?: string };
  if (!body.productId || !body.size) return Response.json({ error: "Missing cart item" }, { status: 400 });
  const sql = getDb();
  await sql`DELETE FROM cart_items WHERE user_id = ${userId} AND product_id = ${body.productId} AND size = ${body.size}`;
  return Response.json({ ok: true });
}
