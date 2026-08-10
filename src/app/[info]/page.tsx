import { notFound } from "next/navigation";

const pages: Record<string, { title: string; copy: string }> = {
  delivery: { title: "Delivery & returns", copy: "We deliver across the UK. Standard delivery is £4.95 and complimentary on orders over £100. Unworn items may be returned within 28 days; detailed instructions are included with every order." },
  contact: { title: "Contact us", copy: "Our customer care team will be available Monday to Friday, 9am–5pm. Add your final support email and telephone number before launch." },
  "size-guide": { title: "Size guide", copy: "Product sizes follow standard UK measurements. Individual fit notes and detailed garment measurements will be added as the catalogue is finalised." },
  about: { title: "Our story", copy: "Exquisuite is a modern UK fashion destination bringing together womenswear, menswear and a curated designer edit with an emphasis on quality, versatility and confident personal style." },
  privacy: { title: "Privacy", copy: "This page is reserved for the final UK GDPR privacy notice covering customer accounts, orders, payments, analytics and marketing preferences." },
  terms: { title: "Terms", copy: "This page is reserved for the final terms of sale, delivery, returns, product descriptions and customer service policies. Legal review is recommended before launch." },
};

export default async function InfoPage({ params }: { params: Promise<{ info: string }> }) {
  const page = pages[(await params).info];
  if (!page) notFound();
  return <section className="shell info-page"><p className="eyebrow dark">Exquisuite</p><h1>{page.title}</h1><p>{page.copy}</p></section>;
}
