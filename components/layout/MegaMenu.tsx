import Link from "next/link";
import Image from "next/image";
import { finishesMegaMenu } from "@/data/navigation";
import { finishes } from "@/data/finishes";

function MenuColumn({
  title,
  items,
}: {
  title: string;
  items: { label: string; param: string; value: string }[];
}) {
  return (
    <div>
      <p className="font-sans text-[11px] font-medium uppercase tracking-[0.24em] text-warm-grey">{title}</p>
      <ul className="mt-4 flex flex-col gap-3">
        {items.map((item) => (
          <li key={item.label}>
            <Link
              href={`/finishes?${item.param}=${encodeURIComponent(item.value)}`}
              className="font-sans text-[15px] text-charcoal-soft transition-colors hover:text-charcoal"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function MegaMenu() {
  const previewFinishes = finishes.filter((f) => f.featured).slice(0, 3);

  return (
    <div
      className="animate-fade-up absolute inset-x-0 top-full border-t border-line bg-ivory shadow-[0_16px_32px_-24px_rgba(33,30,26,0.16)] [animation-duration:0.35s]"
      role="menu"
    >
      <div className="mx-auto grid w-full max-w-[1440px] grid-cols-1 gap-10 px-6 py-10 md:px-10 lg:grid-cols-[1.6fr_1fr] lg:px-16">
        <div className="grid grid-cols-3 gap-10">
          <MenuColumn title="By Category" items={finishesMegaMenu.byCategory} />
          <MenuColumn title="By Style" items={finishesMegaMenu.byStyle} />
          <MenuColumn title="By Application" items={finishesMegaMenu.byApplication} />
        </div>
        <div className="flex flex-col gap-4 border-t border-line pt-8 lg:border-t-0 lg:border-l lg:pl-10 lg:pt-0">
          <p className="font-sans text-[11px] font-medium uppercase tracking-[0.24em] text-warm-grey">
            Featured Textures
          </p>
          <div className="grid grid-cols-3 gap-3">
            {previewFinishes.map((finish) => (
              <Link
                key={finish.id}
                href={`/finishes/${finish.slug}`}
                className="group relative aspect-square overflow-hidden bg-limestone"
              >
                <Image
                  quality={95}
                  src={finish.heroImage}
                  alt={finish.name}
                  fill
                  sizes="240px"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </Link>
            ))}
          </div>
          <Link
            href="/finishes"
            className="mt-2 inline-flex items-center gap-2 font-sans text-xs font-medium uppercase tracking-[0.18em] text-charcoal underline underline-offset-4 decoration-line hover:decoration-charcoal"
          >
            View All Finishes →
          </Link>
        </div>
      </div>
    </div>
  );
}
