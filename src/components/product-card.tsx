"use client";
import Image from "next/image";
import { useState } from "react";
import { useAuth, useClerk } from "@clerk/nextjs";
import type { Product } from "@/lib/products";
import { pounds } from "@/lib/products";

export function ProductCard({ product }: { product: Product }) {
  const { isSignedIn } = useAuth();
  const { openSignIn } = useClerk();
  const [size, setSize] = useState(product.sizes[0]);
  const [status, setStatus] = useState<"idle" | "adding" | "added" | "error">("idle");

  async function addToBag() {
    if (!isSignedIn) { openSignIn({ forceRedirectUrl: "/#new" }); return; }
    setStatus("adding");
    const response = await fetch("/api/cart", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ productId: product.id, size, quantity: 1 }) });
    setStatus(response.ok ? "added" : "error");
  }

  return <article className="product-card">
    <div className="product-image"><Image src={product.image} alt={product.name} fill sizes="(max-width: 700px) 50vw, (max-width: 1100px) 33vw, 25vw" />{product.badge ? <span className="badge">{product.badge}</span> : null}</div>
    <div className="product-copy"><p className="brand">{product.brand}</p><h3>{product.name}</h3><p className="muted">{product.colour}</p><p className="price">{pounds(product.price)}</p>
      <div className="product-actions"><label><span className="sr-only">Size for {product.name}</span><select value={size} onChange={(event) => setSize(event.target.value)}>{product.sizes.map((item) => <option key={item}>{item}</option>)}</select></label><button onClick={addToBag} disabled={status === "adding"}>{status === "adding" ? "Adding…" : status === "added" ? "Added ✓" : status === "error" ? "Try again" : "Add to bag"}</button></div>
    </div>
  </article>;
}
