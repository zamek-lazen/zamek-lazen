export type GalleryImageSize = "tall" | "medium" | "wide";

export type GalleryImageDefinition = {
  src: string;
  altKey: string;
  width: number;
  height: number;
  size: GalleryImageSize;
};

export const galleryImages: GalleryImageDefinition[] = [
  {
    src: "/images/estate/castle-front-flower.webp",
    altKey: "imageCastleFrontFlower",
    width: 2048,
    height: 1365,
    size: "tall",
  },
  {
    src: "/images/estate/castle-front-summer-path.webp",
    altKey: "imageCastleFrontSummerPath",
    width: 1080,
    height: 810,
    size: "wide",
  },
  {
    src: "/images/estate/castle-park-lawn.webp",
    altKey: "imageCastleParkLawn",
    width: 2816,
    height: 2112,
    size: "medium",
  },
  {
    src: "/images/estate/castle-front-park.webp",
    altKey: "imageCastleFrontPark",
    width: 1080,
    height: 810,
    size: "medium",
  },
  {
    src: "/images/flora/magnolia-bloom-closeup.webp",
    altKey: "imageMagnoliaBloomCloseup",
    width: 2816,
    height: 2112,
    size: "tall",
  },
  {
    src: "/images/estate/castle-lawn-trees-summer.webp",
    altKey: "imageCastleLawnTreesSummer",
    width: 2816,
    height: 2112,
    size: "wide",
  },
  {
    src: "/images/estate/castle-side-garden-summer.webp",
    altKey: "imageCastleSideGardenSummer",
    width: 2816,
    height: 2112,
    size: "medium",
  },
  {
    src: "/images/flora/magnolia-bud-branch-closeup.webp",
    altKey: "imageMagnoliaBudBranchCloseup",
    width: 2816,
    height: 2112,
    size: "medium",
  },
  {
    src: "/images/estate/castle-front-winter-garden.webp",
    altKey: "imageCastleFrontWinterGarden",
    width: 2048,
    height: 1536,
    size: "wide",
  },
  {
    src: "/images/estate/castle-side-winter-park.webp",
    altKey: "imageCastleSideWinterPark",
    width: 2816,
    height: 2112,
    size: "medium",
  },
  {
    src: "/images/estate/castle-front-winter.webp",
    altKey: "imageCastleFrontWinter",
    width: 2048,
    height: 1536,
    size: "medium",
  },
  {
    src: "/images/estate/castle-side-winter.webp",
    altKey: "imageCastleSideWinter",
    width: 2048,
    height: 1536,
    size: "medium",
  },
  {
    src: "/images/estate/winter-park-tree.webp",
    altKey: "imageWinterParkTree",
    width: 600,
    height: 800,
    size: "tall",
  },
  {
    src: "/images/flora/magnolia-bud-closeup.webp",
    altKey: "imageMagnoliaBudCloseup",
    width: 2816,
    height: 2112,
    size: "medium",
  },
  {
    src: "/images/flora/magnolia-bud-detail.webp",
    altKey: "imageMagnoliaBudDetail",
    width: 2816,
    height: 2112,
    size: "medium",
  },
  {
    src: "/images/historical/lazen-estate-front-path-archive.webp",
    altKey: "imageArchiveFrontPath",
    width: 1122,
    height: 700,
    size: "wide",
  },
  {
    src: "/images/historical/lazen-estate-main-facade-archive.webp",
    altKey: "imageArchiveMainFacade",
    width: 2442,
    height: 1658,
    size: "medium",
  },
  {
    src: "/images/historical/lazen-estate-frontage-archive.webp",
    altKey: "imageArchiveFrontage",
    width: 1148,
    height: 805,
    size: "medium",
  },
  {
    src: "/images/historical/lazen-estate-illustration.webp",
    altKey: "imageArchiveIllustration",
    width: 2244,
    height: 1654,
    size: "wide",
  },
  {
    src: "/images/historical/lazen-pioneer-center-archive.webp",
    altKey: "imageArchivePioneerCenter",
    width: 1076,
    height: 691,
    size: "medium",
  },
  {
    src: "/images/historical/lazen-estate-park-view-archive.webp",
    altKey: "imageArchiveParkView",
    width: 1709,
    height: 1173,
    size: "medium",
  },
  {
    src: "/images/historical/lazen-estate-side-facade-archive.webp",
    altKey: "imageArchiveSideFacade",
    width: 1623,
    height: 1061,
    size: "medium",
  },
  {
    src: "/images/historical/lazen-estate-hillside-1927.webp",
    altKey: "imageArchiveHillside1927",
    width: 1703,
    height: 1140,
    size: "wide",
  },
];
