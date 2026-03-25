export type GalleryImageSize = 'tall' | 'medium' | 'wide'

export type GalleryImageDefinition = {
  src: string
  altKey: string
  width: number
  height: number
  size: GalleryImageSize
}

export const galleryImages: GalleryImageDefinition[] = [
  {
    src: '/images/gallery/1.webp',
    altKey: 'image01',
    width: 3264,
    height: 2448,
    size: 'medium'
  },
  {
    src: '/images/gallery/2.webp',
    altKey: 'image02',
    width: 5315,
    height: 3544,
    size: 'wide'
  },
  {
    src: '/images/gallery/3.webp',
    altKey: 'image03',
    width: 3543,
    height: 5315,
    size: 'tall'
  },
  {
    src: '/images/gallery/4.webp',
    altKey: 'image04',
    width: 5315,
    height: 3543,
    size: 'wide'
  },
  {
    src: '/images/gallery/5.webp',
    altKey: 'image05',
    width: 5315,
    height: 3543,
    size: 'wide'
  },
  {
    src: '/images/gallery/6.webp',
    altKey: 'image06',
    width: 5315,
    height: 3543,
    size: 'wide'
  },
  {
    src: '/images/gallery/7.webp',
    altKey: 'image07',
    width: 5315,
    height: 3543,
    size: 'wide'
  },
  {
    src: '/images/gallery/8.webp',
    altKey: 'image08',
    width: 6720,
    height: 4480,
    size: 'wide'
  },
  {
    src: '/images/gallery/9.webp',
    altKey: 'image09',
    width: 5315,
    height: 3544,
    size: 'wide'
  },
  {
    src: '/images/gallery/10.webp',
    altKey: 'image10',
    width: 3544,
    height: 5315,
    size: 'tall'
  },
  {
    src: '/images/gallery/11.webp',
    altKey: 'image11',
    width: 5315,
    height: 3543,
    size: 'wide'
  },
  {
    src: '/images/gallery/12.webp',
    altKey: 'image12',
    width: 5315,
    height: 3544,
    size: 'wide'
  },
  {
    src: '/images/gallery/13.webp',
    altKey: 'image13',
    width: 1600,
    height: 1200,
    size: 'medium'
  },
  {
    src: '/images/gallery/14.webp',
    altKey: 'image14',
    width: 1200,
    height: 1600,
    size: 'tall'
  },
  {
    src: '/images/gallery/15.webp',
    altKey: 'image15',
    width: 3264,
    height: 2448,
    size: 'medium'
  },
  {
    src: '/images/gallery/16.webp',
    altKey: 'image16',
    width: 640,
    height: 480,
    size: 'medium'
  },
  {
    src: '/images/gallery/17.webp',
    altKey: 'image17',
    width: 1600,
    height: 1200,
    size: 'medium'
  },
  {
    src: '/images/gallery/18.webp',
    altKey: 'image18',
    width: 640,
    height: 480,
    size: 'wide'
  }
]
