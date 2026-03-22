export type HomepageSpotlightLink = {
  href: "/historie" | "/rod" | "/svatby" | "/akce";
  title: string;
  description: string;
};

export type HomepageEventPreview = {
  title: string;
  status: string;
  href: "/akce";
};

export type HomepageCopy = {
  eyebrow: string;
  title: string;
  lead: string;
  description: string;
  highlightsTitle: string;
  ctaHistory: string;
  ctaContact: string;
};
