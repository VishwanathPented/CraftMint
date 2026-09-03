"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { LinkButton } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { heroSlides } from "@/data/heroSlides";
import { cn } from "@/lib/utils";

const AUTOPLAY_MS = 7000;
const RESUME_DELAY_MS = 9000;
const EASE = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const total = heroSlides.length;
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [paused, setPaused] = useState(false);
  const resumeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const touchStartX = useRef<number | null>(null);

  const goTo = useCallback(
    (nextIndex: number, dir: 1 | -1) => {
      setDirection(dir);
      setIndex((nextIndex + total) % total);
    },
    [total],
  );

  const manualGoTo = useCallback(
    (nextIndex: number, dir: 1 | -1) => {
      goTo(nextIndex, dir);
      setPaused(true);
      if (resumeTimeout.current) clearTimeout(resumeTimeout.current);
      resumeTimeout.current = setTimeout(() => setPaused(false), RESUME_DELAY_MS);
    },
    [goTo],
  );

  const next = useCallback(() => manualGoTo(index + 1, 1), [manualGoTo, index]);
  const prev = useCallback(() => manualGoTo(index - 1, -1), [manualGoTo, index]);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      setDirection(1);
      setIndex((current) => (current + 1) % total);
    }, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [paused, total]);

  useEffect(
    () => () => {
      if (resumeTimeout.current) clearTimeout(resumeTimeout.current);
    },
    [],
  );

  function onKeyDown(event: React.KeyboardEvent<HTMLElement>) {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      next();
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      prev();
    }
  }

  function onTouchStart(event: React.TouchEvent<HTMLElement>) {
    touchStartX.current = event.touches[0].clientX;
  }

  function onTouchEnd(event: React.TouchEvent<HTMLElement>) {
    if (touchStartX.current === null) return;
    const delta = event.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > 48) {
      if (delta < 0) next();
      else prev();
    }
    touchStartX.current = null;
  }

  const slide = heroSlides[index];

  return (
    <section
      className="relative flex h-[92vh] min-h-[640px] w-full items-end overflow-hidden bg-charcoal focus:outline-none"
      role="region"
      aria-roledescription="carousel"
      aria-label="Featured Craftmint surface finishes"
      tabIndex={0}
      onKeyDown={onKeyDown}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <AnimatePresence initial={false}>
        <motion.div
          key={slide.image}
          initial={{ opacity: 0, x: direction * 28 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: direction * -28 }}
          transition={{ duration: 0.75, ease: EASE }}
          className="absolute inset-0"
        >
          <Image
            quality={95}
            src={slide.image}
            alt={slide.alt}
            fill
            priority={index === 0}
            sizes="100vw"
            className="object-cover opacity-90"
          />
        </motion.div>
      </AnimatePresence>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/20 to-charcoal/10" />

      {/* Arrow controls */}
      <button
        type="button"
        aria-label="Previous image"
        onClick={prev}
        className="group/arrow absolute left-1 top-1/2 z-20 flex h-14 w-12 -translate-y-1/2 items-center justify-center text-ivory/60 transition-colors duration-300 ease-out hover:text-ivory focus-ring sm:left-3 md:left-6 lg:left-10"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden className="transition-transform duration-300 ease-out group-hover/arrow:-translate-x-1">
          <path d="M15 5L8 12L15 19" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <button
        type="button"
        aria-label="Next image"
        onClick={next}
        className="group/arrow absolute right-1 top-1/2 z-20 flex h-14 w-12 -translate-y-1/2 items-center justify-center text-ivory/60 transition-colors duration-300 ease-out hover:text-ivory focus-ring sm:right-3 md:right-6 lg:right-10"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden className="transition-transform duration-300 ease-out group-hover/arrow:translate-x-1">
          <path d="M9 5L16 12L9 19" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <div className="relative z-10 w-full px-6 pb-16 md:px-10 lg:px-16 lg:pb-20">
        <div className="mx-auto max-w-[1440px]">
          <Eyebrow className="text-ivory/70 animate-fade-up">Craftmint LLP</Eyebrow>
          <h1 className="mt-4 max-w-3xl font-display text-5xl leading-[1.02] tracking-tight text-ivory text-balance animate-fade-up sm:text-6xl lg:text-8xl [animation-delay:120ms]">
            Surfaces that
            <br />
            define space.
          </h1>
          <p className="mt-6 max-w-md font-sans text-base leading-relaxed text-ivory/80 animate-fade-up [animation-delay:240ms]">
            Premium decorative finishes, textures and architectural surfaces, brought together with
            material expertise and end-to-end execution.
          </p>
          <div className="mt-9 flex flex-wrap gap-4 animate-fade-up [animation-delay:360ms]">
            <LinkButton href="/finishes" size="lg" variant="outline-light">
              Explore Finishes
            </LinkButton>
            <LinkButton href="/contact" size="lg" className="bg-ivory text-charcoal hover:bg-ivory/85">
              Start Your Project
            </LinkButton>
          </div>

          <div className="mt-12 flex items-center gap-5">
            <div className="flex items-center gap-2" role="tablist" aria-label="Choose image">
              {heroSlides.map((s, i) => (
                <button
                  key={s.image}
                  type="button"
                  role="tab"
                  aria-selected={i === index}
                  aria-label={`Go to image ${i + 1} of ${total}`}
                  onClick={() => manualGoTo(i, i > index ? 1 : -1)}
                  className="py-2"
                >
                  <span
                    className={cn(
                      "block h-px rounded-full bg-ivory transition-all duration-500 ease-out",
                      i === index ? "w-8 opacity-100" : "w-4 opacity-40 hover:opacity-70",
                    )}
                  />
                </button>
              ))}
            </div>
            <span className="font-sans text-[11px] tracking-[0.2em] text-ivory/50">
              {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
