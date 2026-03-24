"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type HistoryImage = {
  alt: string;
  caption: string;
  objectPosition?: string;
  src: string;
};

type HistoryChapter = {
  body: string;
  detail: string;
  id: string;
  images: readonly [HistoryImage, HistoryImage];
  navLabel: string;
  note: string;
  title: string;
  year: string;
};

type HistoryClosing = {
  body: string;
  detail: string;
  id: string;
  images: readonly [HistoryImage, HistoryImage];
  label: string;
  title: string;
  year?: string;
};

type HistoryInteractiveTimelineProps = {
  chapters: readonly HistoryChapter[];
  closing: HistoryClosing;
  introLabel: string;
  paragraphs: string[];
  timelineLabel: string;
};

export function HistoryInteractiveTimeline({
  chapters,
  closing,
  introLabel,
  paragraphs,
  timelineLabel,
}: HistoryInteractiveTimelineProps) {
  const [activeId, setActiveId] = useState(chapters[0]?.id ?? "");
  const layoutRef = useRef<HTMLDivElement | null>(null);
  const railRef = useRef<HTMLDivElement | null>(null);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  const timelineItems = [...chapters, closing];

  useEffect(() => {
    const items = [...chapters, closing];

    if (items.length === 0) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const nextEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((entryA, entryB) => entryB.intersectionRatio - entryA.intersectionRatio)[0];

        if (nextEntry?.target.id) {
          setActiveId(nextEntry.target.id);
        }
      },
      {
        rootMargin: "-18% 0px -50% 0px",
        threshold: [0.2, 0.35, 0.5, 0.75],
      },
    );

    for (const item of items) {
      const node = sectionRefs.current[item.id];

      if (node) {
        observer.observe(node);
      }
    }

    return () => observer.disconnect();
  }, [chapters, closing]);

  useEffect(() => {
    let frameId = 0;

    const updateRailOffset = () => {
      frameId = 0;

      const layout = layoutRef.current;
      const rail = railRef.current;

      if (!layout || !rail) {
        return;
      }

      if (window.innerWidth < 1024) {
        rail.style.transform = "";
        return;
      }

      const layoutTop = layout.getBoundingClientRect().top + window.scrollY;
      const layoutHeight = layout.offsetHeight;
      const railHeight = rail.offsetHeight;
      const topOffset = 112;
      const maxOffset = Math.max(0, layoutHeight - railHeight);
      const nextOffset = Math.max(
        0,
        Math.min(window.scrollY + topOffset - layoutTop, maxOffset),
      );

      rail.style.transform =
        nextOffset > 0 ? `translateY(${nextOffset}px)` : "";
    };

    const onScroll = () => {
      if (frameId !== 0) {
        return;
      }

      frameId = window.requestAnimationFrame(updateRailOffset);
    };

    updateRailOffset();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      if (frameId !== 0) {
        window.cancelAnimationFrame(frameId);
      }

      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const scrollToChapter = (chapterId: string) => {
    document.getElementById(chapterId)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
    setActiveId(chapterId);
  };

  return (
    <div className="bg-[linear-gradient(180deg,#f4efe4_0%,#ece4d8_26%,#ece7df_100%)] text-[var(--color-forest-900)]">
      <section className="px-[1.2rem] py-[clamp(4rem,7vw,7rem)] md:px-8">
        <div
          ref={layoutRef}
          className="mx-auto w-full max-w-[94rem] lg:grid lg:grid-cols-[17rem_minmax(0,1fr)] lg:items-start lg:gap-14"
        >
          <aside className="mb-10 lg:mb-0 lg:self-start">
            <div
              ref={railRef}
              className="lg:will-change-transform"
            >
              <p className="font-sans text-[0.72rem] uppercase tracking-[0.22em] text-[rgba(19,52,45,0.48)]">
                {timelineLabel}
              </p>

              <div className="mt-8 border-l border-[rgba(19,52,45,0.14)] pl-3">
                <div className="flex gap-3 overflow-x-auto pb-2 lg:block lg:space-y-2 lg:overflow-visible">
                  {timelineItems.map((item) => {
                    const isActive = item.id === activeId;

                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => scrollToChapter(item.id)}
                        className={`relative min-w-fit pl-4 text-left lg:block lg:w-full ${
                          isActive
                            ? "text-[var(--color-forest-900)]"
                            : "text-[rgba(19,52,45,0.48)] hover:text-[rgba(19,52,45,0.78)]"
                        }`}
                      >
                        <span
                          className={`absolute left-[-1.1rem] top-[0.55rem] h-2.5 w-2.5 rounded-full border ${
                            isActive
                              ? "border-[var(--color-forest-900)] bg-[var(--color-forest-900)]"
                              : "border-[rgba(19,52,45,0.24)] bg-[#ece4d8]"
                          }`}
                        />
                        {item.year ? (
                          <span className="font-sans text-[0.68rem] uppercase tracking-[0.22em]">
                            {item.year}
                          </span>
                        ) : null}
                        <span className="mt-1 block font-serif text-[1.15rem] leading-[1] tracking-[-0.02em]">
                          {"navLabel" in item ? item.navLabel : item.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </aside>

          <div className="space-y-10 md:space-y-14">
            <section className="border-b border-[rgba(19,52,45,0.12)] pb-10 md:pb-12">
              <p className="font-sans text-[0.72rem] uppercase tracking-[0.22em] text-[rgba(19,52,45,0.48)]">
                {introLabel}
              </p>
              <div className="mt-5 space-y-5">
                {paragraphs.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="max-w-[64ch] font-sans text-[1rem] leading-[1.9] text-[rgba(19,52,45,0.74)]"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>

            {chapters.map((chapter) => (
              <article
                key={chapter.id}
                id={chapter.id}
                ref={(node) => {
                  sectionRefs.current[chapter.id] = node;
                }}
                className="scroll-mt-28 border-b border-[rgba(19,52,45,0.12)] pb-10 md:pb-14"
              >
                <p className="font-sans text-[0.72rem] uppercase tracking-[0.22em] text-[rgba(19,52,45,0.48)]">
                  {chapter.year}
                </p>
                <h2 className="mt-3 font-serif text-[clamp(2.3rem,4.2vw,4.6rem)] leading-[1.1] tracking-[-0.04em] text-balance">
                  {chapter.title}
                </h2>
                <p className="mt-5 max-w-[64ch] font-sans text-[1rem] leading-[1.9] text-[rgba(19,52,45,0.74)]">
                  {chapter.body}
                </p>
                <p className="mt-4 max-w-[58ch] font-serif text-[1.15rem] leading-[1.55] text-[rgba(19,52,45,0.88)]">
                  {chapter.note}
                </p>
                <p className="mt-3 max-w-[58ch] font-sans text-[0.94rem] leading-[1.75] text-[rgba(19,52,45,0.56)]">
                  {chapter.detail}
                </p>

                <div className="mt-8 grid gap-4 md:grid-cols-2">
                  {chapter.images.map((image, imageIndex) => (
                    <figure key={image.src} className="space-y-3">
                      <div
                        className={`relative overflow-hidden rounded-[1.2rem] bg-[rgba(19,52,45,0.08)] ${
                          imageIndex === 0 ? "aspect-[1.18]" : "aspect-[0.9]"
                        }`}
                      >
                        <Image
                          src={image.src}
                          alt={image.alt}
                          fill
                          sizes="(max-width: 767px) 100vw, 50vw"
                          className="object-cover"
                          style={{
                            objectPosition: image.objectPosition ?? "50% 50%",
                          }}
                        />
                      </div>
                      <figcaption className="font-sans text-[0.82rem] leading-[1.5] text-[rgba(19,52,45,0.54)]">
                        {image.caption}
                      </figcaption>
                    </figure>
                  ))}
                </div>
              </article>
            ))}

            <section
              id={closing.id}
              ref={(node) => {
                sectionRefs.current[closing.id] = node;
              }}
              className="pb-2"
            >
              <p className="font-sans text-[0.72rem] uppercase tracking-[0.22em] text-[rgba(19,52,45,0.48)]">
                {closing.label}
              </p>
              <h2 className="mt-3 font-serif text-[clamp(2.2rem,4vw,4rem)] leading-[1.1] tracking-[-0.04em] text-balance">
                {closing.title}
              </h2>
              <p className="mt-5 max-w-[64ch] font-sans text-[1rem] leading-[1.9] text-[rgba(19,52,45,0.74)]">
                {closing.body}
              </p>
              <p className="mt-4  font-serif text-[1.15rem] leading-[1.55] text-[rgba(19,52,45,0.88)]">
                {closing.detail}
              </p>

              <div className="mt-8 grid gap-4 md:grid-cols-2">
                {closing.images.map((image, imageIndex) => (
                  <figure key={image.src} className="space-y-3">
                    <div
                      className={`relative overflow-hidden rounded-[1.2rem] bg-[rgba(19,52,45,0.08)] ${
                        imageIndex === 0 ? "aspect-[1.18]" : "aspect-[0.9]"
                      }`}
                    >
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        sizes="(max-width: 767px) 100vw, 50vw"
                        className="object-cover"
                        style={{
                          objectPosition: image.objectPosition ?? "50% 50%",
                        }}
                      />
                    </div>
                    <figcaption className="font-sans text-[0.82rem] leading-[1.5] text-[rgba(19,52,45,0.54)]">
                      {image.caption}
                    </figcaption>
                  </figure>
                ))}
              </div>
            </section>
          </div>
        </div>
      </section>
    </div>
  );
}
