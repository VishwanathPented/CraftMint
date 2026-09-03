"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "./Logo";
import { MegaMenu } from "./MegaMenu";
import { MobileNav } from "./MobileNav";
import { SearchOverlay } from "./SearchOverlay";
import { primaryNav } from "@/data/navigation";
import { LinkButton } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 24);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setMenuOpen(null);
  }, [pathname]);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 w-full border-b transition-colors duration-300",
          scrolled || menuOpen ? "border-line bg-ivory/95 backdrop-blur-md" : "border-transparent bg-ivory/0",
        )}
        onMouseLeave={() => setMenuOpen(null)}
      >
        <div className="mx-auto flex w-full max-w-[1440px] items-center justify-between px-6 md:px-10 lg:px-16">
          <Logo className={cn("transition-transform duration-300 ease-out", scrolled ? "scale-[0.92]" : "scale-100")} />

          <nav className="hidden items-center gap-11 lg:flex">
            {primaryNav.map((item) => {
              const isDropdown = item.label === "Finishes";
              const isOpen = menuOpen === "Finishes";
              const isActive = pathname === item.href;
              return (
                <div
                  key={item.href}
                  className="relative"
                  onMouseEnter={() => isDropdown && setMenuOpen("Finishes")}
                >
                  <Link
                    href={item.href}
                    className="group flex items-center gap-1.5 py-8 font-sans text-[13px] font-normal uppercase tracking-[0.14em] text-charcoal-soft transition-colors duration-300 ease-out hover:text-charcoal"
                  >
                    <span className="relative">
                      {item.label}
                      <span
                        className={cn(
                          "absolute -bottom-1 left-0 h-px w-full origin-center scale-x-0 bg-charcoal transition-transform duration-300 ease-out group-hover:scale-x-100",
                          isActive && "scale-x-100 bg-charcoal/60",
                        )}
                      />
                    </span>
                    {isDropdown && (
                      <svg
                        width="9"
                        height="9"
                        viewBox="0 0 12 12"
                        fill="none"
                        aria-hidden
                        className={cn(
                          "mt-px transition-transform duration-300 ease-out",
                          isOpen && "-rotate-180",
                        )}
                      >
                        <path
                          d="M2.5 4.5L6 8L9.5 4.5"
                          stroke="currentColor"
                          strokeWidth="1.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </Link>
                </div>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label="Search"
              onClick={() => setSearchOpen(true)}
              className="focus-ring hidden h-10 w-10 items-center justify-center text-charcoal-soft transition-colors duration-300 ease-out hover:text-charcoal lg:flex"
            >
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" aria-hidden>
                <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.5" />
                <path d="M21 21L16.65 16.65" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
            <LinkButton href="/sample-request" variant="secondary" size="md" className="hidden lg:inline-flex">
              Request Sample
            </LinkButton>
            <LinkButton href="/contact" variant="primary" size="md" className="hidden lg:inline-flex">
              Enquire
            </LinkButton>

            <button
              type="button"
              aria-label="Open menu"
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen(true)}
              className="focus-ring flex h-10 w-10 flex-col items-center justify-center gap-[5px] lg:hidden"
            >
              <span className="h-px w-6 bg-charcoal" />
              <span className="h-px w-6 bg-charcoal" />
            </button>
          </div>
        </div>

        {menuOpen === "Finishes" && <MegaMenu />}
      </header>

      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} />
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
