export type Product = {
  id: string;
  name: string;
  category: "Women" | "Men" | "Designer";
  brand: string;
  price: number;
  image: string;
  colour: string;
  sizes: string[];
  badge?: string;
};

export const products: Product[] = [
  { id: "silk-midi-dress", name: "Silk-Feel Midi Dress", category: "Women", brand: "Exquisuite", price: 8900, colour: "Midnight", sizes: ["XS", "S", "M", "L"], badge: "New", image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=1200&q=85" },
  { id: "tailored-trench", name: "Tailored Trench Coat", category: "Women", brand: "Exquisuite", price: 14900, colour: "Stone", sizes: ["XS", "S", "M", "L", "XL"], badge: "Bestseller", image: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?auto=format&fit=crop&w=1200&q=85" },
  { id: "cashmere-knit", name: "Cashmere Blend Knit", category: "Designer", brand: "Atelier Edit", price: 12900, colour: "Oat", sizes: ["S", "M", "L"], image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=1200&q=85" },
  { id: "wool-overshirt", name: "Wool Blend Overshirt", category: "Men", brand: "North & Row", price: 11500, colour: "Charcoal", sizes: ["S", "M", "L", "XL"], badge: "Popular", image: "https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&w=1200&q=85" },
  { id: "relaxed-suit", name: "Relaxed Fit Suit", category: "Men", brand: "North & Row", price: 22900, colour: "Ink", sizes: ["36", "38", "40", "42", "44"], image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=85" },
  { id: "structured-handbag", name: "Structured Leather Bag", category: "Designer", brand: "Maison Edit", price: 17900, colour: "Espresso", sizes: ["One size"], badge: "Limited", image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1200&q=85" },
  { id: "satin-shirt", name: "Fluid Satin Shirt", category: "Women", brand: "Exquisuite", price: 6900, colour: "Ivory", sizes: ["XS", "S", "M", "L", "XL"], image: "https://images.unsplash.com/photo-1605763240000-7e93b172d754?auto=format&fit=crop&w=1200&q=85" },
  { id: "premium-trainers", name: "Premium Leather Trainers", category: "Designer", brand: "Studio E", price: 13900, colour: "White", sizes: ["6", "7", "8", "9", "10", "11"], image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=1200&q=85" }
];

export const productMap = new Map(products.map((product) => [product.id, product]));
export const pounds = (pence: number) => new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP" }).format(pence / 100);
