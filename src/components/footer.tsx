import Link from "next/link";

export function Footer() {
  return <footer className="footer"><div className="shell footer-grid">
    <div><div className="wordmark wordmark-light">EXQUISUITE<span>London</span></div><p>Considered fashion for modern wardrobes.</p></div>
    <div><h3>Customer care</h3><Link href="/delivery">Delivery & returns</Link><Link href="/contact">Contact us</Link><Link href="/size-guide">Size guide</Link></div>
    <div><h3>About</h3><Link href="/about">Our story</Link><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link></div>
    <div><h3>Join the list</h3><p>Private offers, new edits and styling notes.</p><form className="newsletter"><label className="sr-only" htmlFor="email">Email address</label><input id="email" type="email" placeholder="Email address" /><button type="submit">Join</button></form></div>
  </div><div className="shell copyright">© 2026 Exquisuite. UK only. Brand names and imagery in this demonstration catalogue are illustrative.</div></footer>;
}
