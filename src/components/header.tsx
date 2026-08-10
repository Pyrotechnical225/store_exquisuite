import Link from "next/link";
import { AccountActions } from "@/components/account-actions";

export function Header() {
  return <>
    <div className="announcement">Complimentary UK delivery on orders over £100</div>
    <header className="header shell">
      <Link className="wordmark" href="/">EXQUISUITE<span>London</span></Link>
      <nav aria-label="Main navigation">
        <Link href="/#new">New in</Link><Link href="/#women">Women</Link><Link href="/#men">Men</Link><Link href="/#designer">Designer</Link>
      </nav>
      <AccountActions />
    </header>
  </>;
}
