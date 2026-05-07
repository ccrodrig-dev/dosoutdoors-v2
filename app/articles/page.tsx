import type { Metadata } from 'next'
import { client } from '@/sanity/lib/client'
import { allArticlesQuery } from '@/sanity/lib/queries'
import { ArticleSummary } from '@/types/article'
import ArticleCard from '@/components/ArticleCard'

export const metadata: Metadata = {
  title: 'Articles',
  description: 'Browse all travel stories, outdoor guides, and gear recommendations from Dos Outdoors.',
}

export default async function ArticlesPage() {
  const articles: ArticleSummary[] = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
    ? await client.fetch(allArticlesQuery, {}, { next: { revalidate: 3600 } }).catch(() => [])
    : []

  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      <h1 className="font-['var(--font-charmonman)'] text-5xl font-bold text-stone-800 mb-2">All Articles</h1>
      <p className="text-stone-500 mb-12">{articles.length} {articles.length === 1 ? 'article' : 'articles'}</p>

      {articles.length === 0 ? (
        <p className="text-stone-500">No articles yet — check back soon!</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <ArticleCard key={article._id} article={article} />
          ))}
        </div>
      )}
    </div>
  )
}
