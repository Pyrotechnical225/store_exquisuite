"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { Product } from "@/lib/products";
import { pounds } from "@/lib/products";

type Item = { product: Product; size: string; quantity: number };

export function CartView() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [checkingOut, setCheckingOut] = useState(false);
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  useEffect(() => { fetch("/api/cart").then((response) => response.json()).then((data) => setItems(data.items ?? [])).finally(() => setLoading(false)); }, []);

  async function remove(item: Item) {
    const response = await fetch("/api/cart", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ productId: item.product.id, size: item.size }) });
    if (response.ok) setItems((current) => current.filter((line) => line.product.id !== item.product.id || line.size !== item.size));
  }

  async function checkout() {
    setCheckingOut(true);
    const response = await fetch("/api/checkout", { method: "POST" });
    const data = await response.json();
    if (response.ok && data.url) window.location.assign(data.url);
    else { alert(data.error ?? "Checkout is unavailable. Please try again."); setCheckingOut(false); }
  }

  if (loading) return <p className="empty-state">Loading your saved bag…</p>;
  if (!items.length) return <div className="empty-state"><h2>Your bag is empty</h2><p>Your selections will be saved here whenever you sign in.</p><Link className="button" href="/#new">Continue shopping</Link></div>;

  return <div className="cart-layout"><div className="cart-items">{items.map((item) => <article className="cart-item" key={`${item.product.id}-${item.size}`}><div className="cart-thumb"><Image src={item.product.image} alt={item.product.name} fill sizes="140px"/></div><div><p className="brand">{item.product.brand}</p><h2>{item.product.name}</h2><p>Size: {item.size} · Qty: {item.quantity}</p><p className="price">{pounds(item.product.price * item.quantity)}</p><button className="text-button underline" onClick={() => remove(item)}>Remove</button></div></article>)}</div><aside className="summary"><h2>Order summary</h2><div><span>Subtotal</span><strong>{pounds(subtotal)}</strong></div><div><span>UK delivery</span><strong>{subtotal >= 10000 ? "Complimentary" : "£4.95"}</strong></div><div className="total"><span>Total</span><strong>{pounds(subtotal + (subtotal >= 10000 ? 0 : 495))}</strong></div><button className="button checkout" onClick={checkout} disabled={checkingOut}>{checkingOut ? "Opening secure checkout…" : "Secure checkout"}</button><p>Payments are securely processed by Stripe.</p></aside></div>;
}
