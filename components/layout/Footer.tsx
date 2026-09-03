import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Logo } from "./Logo";
import { footerNav } from "@/data/navigation";
import { NewsletterForm } from "@/components/forms/NewsletterForm";

function FooterColumn({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <p className="font-sans text-[11px] font-medium uppercase tracking-[0.24em] text-ivory/50">{title}</p>
      <ul className="mt-5 flex flex-col gap-3">
        {links.map((link) => (
          <li key={link.href + link.label}>
            <Link href={link.href} className="font-sans text-sm text-ivory/80 transition-colors hover:text-ivory">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="bg-charcoal text-ivory">
      <Container className="py-16 lg:py-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.4fr_2.6fr]">
          <div className="flex flex-col gap-5">
            <Logo variant="dark" />
            <p className="max-w-xs font-sans text-sm leading-relaxed text-ivory/70">
              Premium decorative surfaces, textures and architectural finishes with end-to-end project execution.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            <FooterColumn title="Finishes" links={footerNav.finishes} />
            <FooterColumn title="Projects" links={footerNav.projects} />
            <FooterColumn title="Company" links={footerNav.company} />
            <FooterColumn title="Resources" links={footerNav.resources} />
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 border-t border-ivory/10 pt-10 lg:grid-cols-[1.4fr_2.6fr] lg:items-center">
          <h3 className="font-display text-2xl leading-tight text-ivory">
            Material.
            <br />
            Colour.
            <br />
            Inspiration.
          </h3>
          <NewsletterForm />
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-ivory/10 pt-8 text-xs text-ivory/50 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Craftmint LLP. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/contact" className="hover:text-ivory">
              Request Sample
            </Link>
            <Link href="/contact" className="hover:text-ivory">
              Start Project
            </Link>
            <Link href="/contact" className="hover:text-ivory">
              Enquire
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
