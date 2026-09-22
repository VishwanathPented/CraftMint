import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-ivory px-6 text-center text-charcoal">
      <span className="font-sans text-xs uppercase tracking-[0.16em] text-warm-grey">404</span>
      <h1 className="mt-3 font-display text-5xl sm:text-6xl">This surface doesn&rsquo;t exist.</h1>
      <p className="mx-auto mt-4 max-w-md font-sans text-base text-charcoal-soft">
        The page you&rsquo;re looking for may have moved. Explore the collection or head back home.
      </p>
      <div className="mt-9 flex flex-wrap justify-center gap-4">
        <Link
          href="/"
          className="inline-flex items-center justify-center whitespace-nowrap bg-charcoal px-8 py-4 font-sans text-xs font-medium uppercase tracking-[0.12em] text-ivory transition-colors hover:bg-charcoal-soft"
        >
          Back to Home
        </Link>
        <Link
          href="/finishes"
          className="inline-flex items-center justify-center whitespace-nowrap border border-charcoal px-8 py-4 font-sans text-xs font-medium uppercase tracking-[0.12em] text-charcoal transition-colors hover:bg-charcoal hover:text-ivory"
        >
          Explore Finishes
        </Link>
      </div>
    </div>
  );
}
