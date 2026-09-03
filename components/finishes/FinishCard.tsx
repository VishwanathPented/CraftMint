import Image from "next/image";
import Link from "next/link";
import { SwatchImage } from "@/components/finishes/SwatchImage";
import type { Finish } from "@/types";

export function FinishCard({ finish, priority = false }: { finish: Finish; priority?: boolean }) {
  return (
    <Link href={`/finishes/${finish.slug}`} className="group flex flex-col">
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-limestone">
        <Image
          quality={95}
          src={finish.heroImage}
          alt={`${finish.name} — ${finish.category} finish applied`}
          fill
          priority={priority}
          sizes="260vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-x-0 bottom-0 flex translate-y-2 items-center justify-between bg-ivory/95 px-4 py-3 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <span className="font-sans text-xs uppercase tracking-[0.1em] text-charcoal">View Finish</span>
          <span aria-hidden className="font-sans text-sm text-charcoal transition-transform group-hover:translate-x-1">
            →
          </span>
        </div>
      </div>
      <div className="mt-4 flex items-start justify-between gap-3">
        <div>
          <h3 className="font-display text-xl text-charcoal">{finish.name}</h3>
          <p className="mt-1 font-sans text-xs uppercase tracking-[0.1em] text-warm-grey">
            {finish.category} · {finish.textureType} · {finish.sheen}
          </p>
        </div>
        <div className="mt-1 flex shrink-0 -space-x-1.5">
          {finish.swatches.slice(0, 3).map((s) => (
            <span
              key={s.id}
              className="relative h-5 w-5 overflow-hidden rounded-full border border-ivory"
              aria-hidden
            >
              <SwatchImage src={s.image} alt="" sizes="20px" />
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
