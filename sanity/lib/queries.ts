import { groq } from 'next-sanity'

export const allArticlesQuery = groq`
  *[_type == "article"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    publishedAt,
    excerpt,
    tags,
    mainImage { asset, alt, hotspot },
    legacyMainImageUrl
  }
`

export const articleBySlugQuery = groq`
  *[_type == "article" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    publishedAt,
    excerpt,
    tags,
    mainImage { asset, alt, hotspot },
    legacyMainImageUrl,
    body
  }
`

export const allArticleSlugsQuery = groq`
  *[_type == "article"] { "slug": slug.current }
`
