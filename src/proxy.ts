import { clerkMiddleware } from "@clerk/nextjs/server";

// Authentication is enforced in the page and route handler that reads or
// mutates customer data. Keeping the proxy focused on Clerk session context
// avoids coupling the whole storefront to an optional Frontend API proxy.
export default clerkMiddleware();

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
    "/__clerk/(.*)",
  ],
};
