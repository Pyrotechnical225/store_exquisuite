"use client";
import Link from "next/link";
import { SignInButton, UserButton, useAuth } from "@clerk/nextjs";
import { BagIcon } from "@/components/icons";

export function AccountActions() {
  const { isLoaded, isSignedIn } = useAuth();
  if (!isLoaded) return <div className="header-actions" aria-hidden="true" />;
  return <div className="header-actions">{isSignedIn ? <><UserButton /><Link href="/cart" aria-label="Shopping bag"><BagIcon /></Link></> : <><SignInButton mode="modal"><button className="text-button">Sign in</button></SignInButton><SignInButton mode="modal" forceRedirectUrl="/cart"><button className="icon-button" aria-label="Sign in to view shopping bag"><BagIcon /></button></SignInButton></>}</div>;
}
