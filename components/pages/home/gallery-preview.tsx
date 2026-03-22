import Image from "next/image";
import { Link } from "@/i18n/navigation";

type GalleryPreviewProps = {
  eyebrow: string;
  title: string;
  body: string;
  cta: string;
};

export function GalleryPreview({
  body,
  cta,
  eyebrow,
  title,
}: GalleryPreviewProps) {
  return (
    <section className="bg-[linear-gradient(180deg,#0c221d,#0f362e)] px-[1.2rem] py-[clamp(4rem,8vw,7rem)] text-[var(--color-mist-100)] md:px-8">
      <div className="mx-auto w-full max-w-[94rem]">
        <div className="max-w-[42rem]">
          <p className="font-sans text-[0.72rem] uppercase tracking-[0.2em] text-[rgba(201,218,208,0.64)]">
            {eyebrow}
          </p>
          <h2 className="mt-4 max-w-[13ch] font-serif text-[clamp(2.4rem,5vw,4.8rem)] leading-[0.95] tracking-[-0.025em] text-balance text-[rgba(241,245,239,0.96)]">
            {title}
          </h2>
          <p className="mt-5 max-w-[58ch] font-sans text-[1rem] leading-[1.85] text-[rgba(194,211,201,0.78)]">
            {body}
          </p>
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
          <Link
            href="/galerie"
            className="group relative min-h-[23rem] overflow-hidden rounded-[1.25rem]"
          >
            <Image
              src="/images/estate/castle-front-summer-path.webp"
              alt=""
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
          </Link>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            <Link
              href="/galerie"
              className="group relative min-h-[11rem] overflow-hidden rounded-[1rem]"
            >
              <Image
                src="/images/estate/castle-park-lawn.webp"
                alt=""
                fill
                sizes="(max-width: 1024px) 100vw, 30vw"
                className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
            </Link>
            <Link
              href="/galerie"
              className="group relative min-h-[11rem] overflow-hidden rounded-[1rem]"
            >
              <Image
                src="/images/flora/magnolia-bloom-closeup.webp"
                alt=""
                fill
                sizes="(max-width: 1024px) 100vw, 30vw"
                className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
            </Link>
          </div>
        </div>

        <Link
          href="/galerie"
          className="mt-8 inline-flex min-h-11 items-center justify-center border border-[rgba(193,215,204,0.28)] px-6 py-3 font-sans text-[0.75rem] uppercase tracking-[0.18em] text-[rgba(231,238,232,0.94)] transition-transform duration-200 hover:-translate-y-0.5 hover:border-[rgba(223,234,226,0.52)]"
        >
          {cta}
        </Link>
      </div>
    </section>
  );
}
