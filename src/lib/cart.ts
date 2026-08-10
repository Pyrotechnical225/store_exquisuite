import { getDb } from "@/lib/db";
import { productMap } from "@/lib/products";

export type CartLine = { productId: string; size: string; quantity: number };

export async function readCart(userId: string) {
  const sql = getDb();
  const rows = await sql`SELECT product_id, size, quantity FROM cart_items WHERE user_id = ${userId} ORDER BY updated_at DESC` as unknown as Array<{ product_id: string; size: string; quantity: number }>;
  return rows.flatMap((row) => {
    const product = productMap.get(String(row.product_id));
    return product ? [{ product, size: String(row.size), quantity: Number(row.quantity) }] : [];
  });
}
