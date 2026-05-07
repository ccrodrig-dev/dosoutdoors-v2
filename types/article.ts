import { PortableTextBlock } from '@portabletext/react'

export interface SanityImageAsset {
  asset: { _ref: string }
  alt?: string
  hotspot?: { x: number; y: number; height: number; width: number }
}

export interface ArticleSummary {
  _id: string
  title: string
  slug: { current: string }
  publishedAt: string
  excerpt: string
  tags: string[]
  mainImage?: SanityImageAsset
  legacyMainImageUrl?: string
}

export interface Article extends ArticleSummary {
  body: PortableTextBlock[]
}
