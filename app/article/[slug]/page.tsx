import type { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { client } from '@/sanity/lib/client'
import { articleBySlugQuery, allArticleSlugsQuery } from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/image'
import { Article } from '@/types/article'
import ArticleBody from '@/components/ArticleBody'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) return []
  try {
    const slugs: { slug: string }[] = await client.fetch(allArticleSlugsQuery)
    return slugs.map(({ slug }) => ({ slug }))
  } catch {
    return []
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const article: Article | null = await client.fetch(articleBySlugQuery, { slug })
  if (!article) return {}

  const imageUrl = article.mainImage
    ? urlFor(article.mainImage).width(1200).height(630).fit('crop').url()
    : article.legacyMainImageUrl

  return {
    title: article.title,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      ...(imageUrl && { images: [imageUrl] }),
      type: 'article',
      publishedTime: article.publishedAt,
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.excerpt,
      ...(imageUrl && { images: [imageUrl] }),
    },
  }
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params
  const article: Article | null = await client.fetch(
    articleBySlugQuery,
    { slug },
    { next: { revalidate: 3600 } }
  )

  if (!article) notFound()

  const heroUrl = article.mainImage
    ? urlFor(article.mainImage).width(1400).height(600).fit('crop').url()
    : (article.legacyMainImageUrl ?? '/placeholder.jpg')

  return (
    <article className="max-w-4xl mx-auto px-4 py-12">
      {/* Tags */}
      {article.tags?.length > 0 && (
        <div className="flex gap-2 mb-4">
          {article.tags.map((tag) => (
            <span key={tag} className="text-xs font-medium text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full">
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Title */}
      <h1 className="font-['var(--font-charmonman)'] text-4xl md:text-5xl font-bold text-stone-900 leading-tight mb-4">
        {article.title}
      </h1>

      {/* Date */}
      <p className="text-sm text-stone-400 mb-8">
        {new Date(article.publishedAt).toLocaleDateString('en-US', {
          year: 'numeric', month: 'long', day: 'numeric',
        })}
      </p>

      {/* Hero image */}
      <div className="relative w-full rounded-2xl overflow-hidden mb-12" style={{ aspectRatio: '7/3' }}>
        <Image
          src={heroUrl}
          alt={article.mainImage?.alt ?? article.title}
          fill
          className="object-cover"
          priority
          sizes="(max-width: 768px) 100vw, 900px"
        />
      </div>

      {/* Excerpt */}
      <p className="text-lg text-stone-600 leading-relaxed border-l-4 border-emerald-400 pl-5 mb-12 italic">
        {article.excerpt}
      </p>

      {/* Body */}
      <ArticleBody body={article.body} />
    </article>
  )
}
