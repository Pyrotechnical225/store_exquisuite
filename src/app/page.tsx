import Image from "next/image";
import Link from "next/link";
import { ArrowIcon } from "@/components/icons";
import { ProductCard } from "@/components/product-card";
import { products } from "@/lib/products";

export default function Home() {
  return <>
    <section className="hero"><Image src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=2000&q=90" alt="A curated fashion collection in a bright boutique" fill priority sizes="100vw" /><div className="hero-overlay"/><div className="hero-content shell"><p className="eyebrow">The Autumn Edit · 2026</p><h1>Quiet confidence,<br/>impeccably cut.</h1><p>Modern womenswear, menswear and designer pieces selected for enduring style.</p><Link className="button button-light" href="#new">Shop the edit <ArrowIcon /></Link></div></section>
    <section className="service-strip shell"><div><strong>Free UK delivery</strong><span>On orders over £100</span></div><div><strong>Secure checkout</strong><span>Protected by Stripe</span></div><div><strong>Easy returns</strong><span>Within 28 days</span></div></section>
    <section className="section shell" id="new"><div className="section-heading"><div><p className="eyebrow dark">Just arrived</p><h2>The new season</h2></div><p>A considered collection of versatile silhouettes, tactile fabrics and elevated essentials.</p></div><div className="product-grid">{products.slice(0,4).map((product) => <ProductCard key={product.id} product={product} />)}</div></section>
    <section className="category-grid shell"><Link href="#women" className="category-card"><Image src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1200&q=85" alt="Women's fashion collection" fill sizes="(max-width: 760px) 100vw, 50vw"/><span>Women’s collection <ArrowIcon /></span></Link><Link href="#men" className="category-card"><Image src="https://images.unsplash.com/photo-1610652492500-ded49ceeb378?auto=format&fit=crop&w=1200&q=85" alt="Men's fashion collection" fill sizes="(max-width: 760px) 100vw, 50vw"/><span>Men’s collection <ArrowIcon /></span></Link></section>
    <section className="section shell" id="designer"><div className="section-heading"><div><p className="eyebrow dark">Curated labels</p><h2>Designer focus</h2></div><p>Distinctive accessories, tailoring and premium wardrobe foundations.</p></div><div className="product-grid">{products.slice(4).map((product) => <ProductCard key={product.id} product={product} />)}</div></section>
    <section className="editorial"><div className="shell editorial-inner"><p className="eyebrow">Our point of view</p><h2>Buy less. Choose beautifully.</h2><p>We bring together timeless design and fresh perspective—pieces made to earn their place in your wardrobe.</p><Link className="text-link" href="/about">Discover Exquisuite <ArrowIcon /></Link></div></section>
  </>;
}
