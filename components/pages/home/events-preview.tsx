import { Link } from "@/i18n/navigation";
import type { HomepageEventPreview } from "@/types";

type EventsPreviewProps = {
  eyebrow: string;
  title: string;
  body: string;
  featuredLabel: string;
  featuredTitle: string;
  featuredBody: string;
  cta: string;
  events: HomepageEventPreview[];
};

export function EventsPreview({
  body,
  cta,
  events,
  eyebrow,
  featuredBody,
  featuredLabel,
  featuredTitle,
  title,
}: EventsPreviewProps) {
  return (
    <section className="bg-[linear-gradient(180deg,rgba(10,37,31,0.98),rgba(18,70,60,0.98))] px-[1.2rem] py-[clamp(4rem,8vw,7rem)] text-[var(--color-mist-100)] md:px-8">
      <div className="mx-auto w-full max-w-[94rem]">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:items-end">
          <div className="max-w-[34rem]">
            <p className="font-sans text-[0.72rem] uppercase tracking-[0.2em] text-[rgba(201,218,208,0.64)]">
              {eyebrow}
            </p>
            <h2 className="mt-4 max-w-[11ch] font-serif text-[clamp(2.4rem,5vw,4.8rem)] leading-[0.95] tracking-[-0.025em] text-balance text-[rgba(241,245,239,0.96)]">
              {title}
            </h2>
            <p className="mt-5 max-w-[58ch] font-sans text-[1rem] leading-[1.85] text-[rgba(194,211,201,0.78)]">
              {body}
            </p>
          </div>

          <div className="rounded-[1.25rem] border border-[rgba(185,212,197,0.18)] bg-[rgba(255,255,255,0.05)] p-7 shadow-[0_18px_48px_rgba(0,0,0,0.18)] md:p-8">
            <p className="font-sans text-[0.68rem] uppercase tracking-[0.22em] text-[rgba(191,211,201,0.54)]">
              {featuredLabel}
            </p>
            <div className="mt-5 grid gap-5 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-start">
              <div>
                <p className="font-serif text-[clamp(1.8rem,3vw,2.8rem)] leading-[1.04] text-[rgba(241,245,239,0.95)]">
                  {featuredTitle}
                </p>
              </div>
              <p className="font-sans text-[0.98rem] leading-[1.8] text-[rgba(194,211,201,0.76)]">
                {featuredBody}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {events.map((event) => (
            <Link
              key={event.title}
              href={event.href}
              className="rounded-[1rem] border border-[rgba(185,212,197,0.18)] bg-[rgba(6,22,17,0.18)] p-5 transition-transform duration-200 hover:-translate-y-1 hover:border-[rgba(216,229,219,0.32)]"
            >
              <span className="inline-flex rounded-full border border-[rgba(201,218,208,0.24)] px-3 py-1 font-sans text-[0.64rem] uppercase tracking-[0.18em] text-[rgba(220,230,224,0.76)]">
                {event.status}
              </span>
              <p className="mt-5 max-w-[18ch] font-serif text-[1.55rem] leading-[1.12] text-[rgba(241,245,239,0.94)]">
                {event.title}
              </p>
            </Link>
          ))}
        </div>

        <Link
          href="/akce"
          className="mt-8 inline-flex min-h-11 items-center justify-center border border-[rgba(193,215,204,0.28)] px-6 py-3 font-sans text-[0.75rem] uppercase tracking-[0.18em] text-[rgba(231,238,232,0.94)] transition-transform duration-200 hover:-translate-y-0.5 hover:border-[rgba(223,234,226,0.52)]"
        >
          {cta}
        </Link>
      </div>
    </section>
  );
}
