type PageHeroProps = {
  eyebrow?: string;
  title: string;
  lead: string;
  topContent?: React.ReactNode;
};

export function PageHero({ eyebrow, lead, title, topContent }: PageHeroProps) {
  return (
    <section className="bg-[linear-gradient(180deg,rgba(10,37,31,0.98),rgba(15,54,46,0.98))] px-[1.2rem] pb-16 pt-28  text-[var(--color-mist-100)] md:px-8">
      <div className="mx-auto w-full max-w-[94rem]">
        {topContent ? (
          <div className="mb-5">{topContent}</div>
        ) : eyebrow ? (
          <p className="font-sans text-[0.72rem] uppercase tracking-[0.2em] text-[rgba(201,218,208,0.64)]">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="mt-4 font-serif text-[clamp(2.8rem,6vw,5.5rem)] leading-[1.15] tracking-[-0.025em] text-balance text-[rgba(241,245,239,0.96)]">
          {title}
        </h1>
        <p className="mt-5 font-serif text-[clamp(1.08rem,2.3vw,1.5rem)] leading-[1.3] text-[rgba(220,230,224,0.84)]">
          {lead}
        </p>
      </div>
    </section>
  );
}
