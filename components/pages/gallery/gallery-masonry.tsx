"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import type { GalleryImageDefinition } from "@/components/pages/gallery/gallery-images";

type GalleryMasonryImage = Omit<GalleryImageDefinition, "altKey"> & {
  alt: string;
};

type GalleryMasonryProps = {
  images: GalleryMasonryImage[];
  ui: {
    closeImageLabel: string;
    imageDialogLabel: string;
    openImageLabel: string;
  };
};

const sizeClasses: Record<GalleryImageDefinition["size"], string> = {
  tall: "row-span-28 md:row-span-32",
  medium: "row-span-20 md:row-span-22",
  wide: "row-span-22 md:row-span-24 xl:col-span-2",
};

const imageSizes: Record<GalleryImageDefinition["size"], string> = {
  tall: "(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 33vw",
  medium: "(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 33vw",
  wide: "(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 66vw",
};

export function GalleryMasonry({ images, ui }: GalleryMasonryProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const activeImage = activeIndex === null ? null : images[activeIndex];

  useEffect(() => {
    if (activeImage === null) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveIndex(null);
      }
    };

    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeImage]);

  return (
    <>
      <div className="grid auto-rows-[12px] grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {images.map((image, index) => (
          <button
            key={image.src}
            type="button"
            onClick={() => setActiveIndex(index)}
            className={`group relative block overflow-hidden rounded-[0.95rem] border border-[rgba(185,212,197,0.14)] bg-[rgba(7,24,19,0.36)] text-left transition-transform duration-300 hover:-translate-y-1 ${sizeClasses[image.size]}`}
            aria-label={`${ui.openImageLabel}: ${image.alt}`}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes={imageSizes[image.size]}
              quality={90}
              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
          </button>
        ))}
      </div>

      {activeImage ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(4,14,11,0.86)] p-4 backdrop-blur-md md:p-8"
          role="dialog"
          aria-modal="true"
          aria-label={ui.imageDialogLabel}
          onClick={() => setActiveIndex(null)}
        >
          <button
            type="button"
            onClick={() => setActiveIndex(null)}
            className="absolute right-4 top-4 z-10 inline-flex h-12 w-12 items-center justify-center rounded-full border border-[rgba(221,232,223,0.24)] bg-[rgba(7,24,19,0.72)] text-[1.4rem] leading-none text-[var(--color-mist-50)] transition-colors duration-200 hover:bg-[rgba(11,39,31,0.9)] md:right-6 md:top-6"
            aria-label={ui.closeImageLabel}
          >
            <span aria-hidden>×</span>
          </button>

          <div
            className="flex max-h-full w-full max-w-[92rem] flex-col gap-4"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="relative flex min-h-0 flex-1 items-center justify-center overflow-hidden rounded-[1.4rem] border border-[rgba(221,232,223,0.16)] bg-[rgba(7,24,19,0.55)] p-3 shadow-[0_32px_100px_rgba(0,0,0,0.45)] md:p-6">
              <Image
                src={activeImage.src}
                alt={activeImage.alt}
                width={activeImage.width}
                height={activeImage.height}
                sizes="100vw"
                quality={95}
                priority
                className="h-auto max-h-[82vh] w-auto max-w-full object-contain"
              />
            </div>

            <p className="text-center font-sans text-[0.92rem] leading-[1.7] text-[rgba(221,232,223,0.82)]">
              {activeImage.alt}
            </p>
          </div>
        </div>
      ) : null}
    </>
  );
}
