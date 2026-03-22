import Image from "next/image";
import { Link } from "@/i18n/navigation";

type WeddingsPreviewProps = {
  eyebrow: string;
  title: string;
  lead: string;
  body: string;
  steps: [string, string, string, string];
  cta: string;
};

export function WeddingsPreview({
  body,
  cta,
  eyebrow,
  lead,
  steps,
  title,
}: WeddingsPreviewProps) {
  return (
    <section className="bg-[linear-gradient(180deg,#f7f2e8,#efe7da)] px-[1.2rem] py-[clamp(4rem,8vw,7rem)] text-[var(--color-forest-900)] md:px-8">
      <div className="mx-auto grid w-full max-w-[94rem] gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-center">
        <div className="relative min-h-[24rem] overflow-hidden rounded-[1.25rem] border border-[rgba(19,52,45,0.08)] shadow-[0_20px_60px_rgba(15,33,28,0.16)]">
          <Image
            src="/images/estate/castle-front-summer-path.webp"
            alt=""
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(12,34,28,0.04),rgba(12,34,28,0.34)_70%,rgba(12,34,28,0.62))]" />
          <div className="absolute bottom-0 left-0 right-0 p-6 text-[var(--color-mist-50)] md:p-8">
            <p className="font-sans text-[0.68rem] uppercase tracking-[0.22em] text-[rgba(226,235,228,0.72)]">
              Zámecký park / zimní zahrada
            </p>
            <p className="mt-3 max-w-[26ch] font-serif text-[clamp(1.6rem,3vw,2.4rem)] leading-[1.08] text-balance">
              {lead}
            </p>
          </div>
        </div>

        <div className="max-w-[38rem]">
          <p className="font-sans text-[0.72rem] uppercase tracking-[0.2em] text-[rgba(19,52,45,0.56)]">
            {eyebrow}
          </p>
          <h2 className="mt-4 max-w-[10ch] font-serif text-[clamp(2.4rem,5vw,4.6rem)] leading-[0.96] tracking-[-0.025em] text-balance">
            {title}
          </h2>
          <p className="mt-5 max-w-[56ch] font-sans text-[1rem] leading-[1.85] text-[rgba(19,52,45,0.74)]">
            {body}
          </p>

          <ol className="mt-8 grid gap-3 border-t border-[rgba(19,52,45,0.12)] pt-5">
            {steps.map((step, index) => (
              <li
                key={step}
                className="grid gap-2 border-b border-[rgba(19,52,45,0.08)] pb-3 md:grid-cols-[auto_minmax(0,1fr)] md:items-start md:gap-4"
              >
                <span className="font-sans text-[0.68rem] uppercase tracking-[0.22em] text-[rgba(19,52,45,0.46)]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="font-serif text-[1.2rem] leading-[1.2] text-[rgba(19,52,45,0.92)]">
                  {step}
                </span>
              </li>
            ))}
          </ol>

          <Link
            href="/svatby"
            className="mt-8 inline-flex min-h-11 items-center justify-center border border-[rgba(19,52,45,0.16)] bg-[rgba(255,255,255,0.48)] px-6 py-3 font-sans text-[0.75rem] uppercase tracking-[0.18em] transition-transform duration-200 hover:-translate-y-0.5 hover:bg-white"
          >
            {cta}
          </Link>
        </div>
      </div>
    </section>
  );
}
