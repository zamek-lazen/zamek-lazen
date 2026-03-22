"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";

type HeroProps = {
  eyebrow: string;
  title: string;
  lead: string;
  description: string;
  ctaPrimary: string;
  ctaSecondary: string;
  scrollPrompt: string;
  sideLeft: string;
  sideRight: string;
};

export function Hero({
  ctaPrimary,
  ctaSecondary,
  description,
  eyebrow,
  lead,
  scrollPrompt,
  sideLeft,
  sideRight,
  title,
}: HeroProps) {
  const [pointer, setPointer] = useState({ x: 0, y: 0 });
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotionPreference = () =>
      setPrefersReducedMotion(mediaQuery.matches);

    updateMotionPreference();
    mediaQuery.addEventListener("change", updateMotionPreference);

    return () =>
      mediaQuery.removeEventListener("change", updateMotionPreference);
  }, []);

  const imageTransform = prefersReducedMotion
    ? "scale(1.02)"
    : `translate3d(${pointer.x * -16}px, ${pointer.y * -12}px, 0) scale(1.06)`;
  const copyTransform = prefersReducedMotion
    ? "translate3d(0, 0, 0)"
    : `translate3d(${pointer.x * 10}px, ${pointer.y * 8}px, 0)`;
  const glowTransform = prefersReducedMotion
    ? "translate3d(0, 0, 0)"
    : `translate3d(${pointer.x * 22}px, ${pointer.y * 18}px, 0)`;

  return (
    <section
      className="relative isolate h-[100dvh] min-h-[100svh] overflow-hidden bg-[var(--color-forest-950)] px-[1.2rem] pt-[clamp(6.25rem,10vh,8.5rem)] text-[var(--color-mist-50)] md:px-8 md:pt-[clamp(6.75rem,10vh,9rem)]"
      onMouseMove={(event) => {
        if (prefersReducedMotion) {
          return;
        }

        const bounds = event.currentTarget.getBoundingClientRect();
        const x = (event.clientX - bounds.left) / bounds.width - 0.5;
        const y = (event.clientY - bounds.top) / bounds.height - 0.5;
        setPointer({ x, y });
      }}
      onMouseLeave={() => setPointer({ x: 0, y: 0 })}
    >
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-[-3%] transition-transform duration-300 ease-out"
          style={{ transform: imageTransform }}
        >
          <Image
            src="/images/estate/castle-front-flower.webp"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover [object-position:center_35%]"
          />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,22,17,0.34),rgba(6,22,17,0.18)_22%,rgba(6,22,17,0.56)_58%,rgba(6,22,17,0.9)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_14%_18%,rgba(214,226,188,0.2),transparent_25%),radial-gradient(circle_at_72%_20%,rgba(255,211,165,0.16),transparent_24%),radial-gradient(circle_at_50%_100%,rgba(7,43,34,0.78),transparent_50%)]" />
        <div
          aria-hidden
          className="absolute left-[8%] top-[16%] h-44 w-44 rounded-full bg-[rgba(169,204,171,0.18)] blur-[90px] transition-transform duration-300 ease-out md:h-72 md:w-72"
          style={{ transform: glowTransform }}
        />
      </div>

      <div className="relative mx-auto flex h-full w-full max-w-[94rem] items-end pb-[clamp(2.25rem,5vh,4.75rem)]">
        <div className="grid w-full gap-10 md:grid-cols-[minmax(0,0.9fr)_minmax(16rem,0.52fr)] md:items-end">
          <div
            className="max-w-[48rem] rounded-[1.25rem] border border-[rgba(221,232,223,0.16)] bg-[linear-gradient(180deg,rgba(8,24,20,0.18),rgba(8,24,20,0.44))] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.26)] backdrop-blur-[10px] transition-transform duration-300 ease-out md:p-9"
            style={{ transform: copyTransform }}
          >
            <p className="font-sans text-[0.72rem] uppercase tracking-[0.24em] text-[rgba(232,238,232,0.72)]">
              {eyebrow}
            </p>
            <h1 className="mt-4 max-w-[11ch] font-serif text-[clamp(3.5rem,8vw,7.5rem)] leading-[0.9] tracking-[-0.03em] text-balance">
              {title}
            </h1>
            <p className="mt-5 max-w-[25ch] font-serif text-[clamp(1.1rem,2.7vw,1.6rem)] leading-tight text-[rgba(232,238,232,0.88)]">
              {lead}
            </p>
            <p className="mt-5 max-w-[56ch] font-sans text-[clamp(0.98rem,1.75vw,1.08rem)] leading-[1.8] text-[rgba(215,224,217,0.78)]">
              {description}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/historie"
                className="inline-flex min-h-11 items-center justify-center border border-[rgba(236,242,236,0.45)] bg-[rgba(239,244,238,0.92)] px-6 py-3 font-sans text-[0.75rem] font-medium uppercase tracking-[0.18em] text-[var(--color-forest-900)] transition-transform duration-200 hover:-translate-y-0.5 hover:bg-[rgba(246,249,245,1)]"
                style={{ color: "var(--color-forest-900)" }}
              >
                {ctaPrimary}
              </Link>
              <Link
                href="/kontakt"
                className="inline-flex min-h-11 items-center justify-center border border-[rgba(210,223,213,0.28)] bg-[rgba(8,24,20,0.16)] px-6 py-3 font-sans text-[0.75rem] uppercase tracking-[0.18em] text-[rgba(232,238,232,0.92)] transition-transform duration-200 hover:-translate-y-0.5 hover:border-[rgba(229,236,228,0.46)] hover:bg-[rgba(8,24,20,0.28)]"
              >
                {ctaSecondary}
              </Link>
            </div>
          </div>

          <div className="hidden self-end justify-self-end md:block">
            <div className="border-l border-[rgba(224,233,225,0.24)] pl-5 text-right">
              <p className="font-sans text-[0.68rem] uppercase tracking-[0.28em] text-[rgba(223,232,224,0.52)]">
                {scrollPrompt}
              </p>
              <p className="mt-3 max-w-[18ch] font-serif text-[1.25rem] leading-[1.25] text-[rgba(236,241,236,0.84)]">
                {sideLeft}{" "}
                <span className="text-[rgba(198,216,204,0.66)]">/</span>{" "}
                {sideRight}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-6 left-1/2 flex -translate-x-1/2 items-center gap-3 text-[rgba(229,235,230,0.68)] md:hidden">
        <span className="h-px w-10 bg-[rgba(229,235,230,0.28)]" />
        <span className="font-sans text-[0.7rem] uppercase tracking-[0.22em]">
          {scrollPrompt}
        </span>
        <span className="h-px w-10 bg-[rgba(229,235,230,0.28)]" />
      </div>
    </section>
  );
}
