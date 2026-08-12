"use client";

export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="en">
      <body>
        <main className="shell info-page">
          <p className="eyebrow dark">Exquisuite</p>
          <h1>Something went wrong.</h1>
          <p>We couldn’t load the store just now. Please try again.</p>
          <button type="button" className="button" onClick={reset}>Try again</button>
        </main>
      </body>
    </html>
  );
}
