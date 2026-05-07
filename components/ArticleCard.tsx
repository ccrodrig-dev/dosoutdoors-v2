import Link from 'next/link'
import Image from 'next/image'
import { ArticleSummary } from '@/types/article'
import { urlFor } from '@/sanity/lib/image'

export default function ArticleCard({ article }: { article: ArticleSummary }) {
  const imageUrl = article.mainImage
    ? urlFor(article.mainImage).width(600).height(400).fit('crop').url()
    : (article.legacyMainImageUrl ?? '/placeholder.jpg')

  return (
    <Link
      href={`/article/${article.slug.current}`}
      className="group flex flex-col rounded-2xl overflow-hidden border border-stone-200 hover:shadow-lg transition-shadow bg-white"
    >
      <div className="relative aspect-[3/2] overflow-hidden">
        <Image
          src={imageUrl}
          alt={article.mainImage?.alt ?? article.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>
      <div className="flex flex-col flex-1 p-5 gap-2">
        {article.tags?.length > 0 && (
          <div className="flex gap-2 flex-wrap">
            {article.tags.slice(0, 2).map((tag) => (
              <span key={tag} className="text-xs font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                {tag}
              </span>
            ))}
          </div>
        )}
        <h3 className="font-semibold text-stone-900 leading-snug group-hover:text-emerald-700 transition-colors">
          {article.title}
        </h3>
        <p className="text-sm text-stone-500 line-clamp-2 flex-1">{article.excerpt}</p>
        <p className="text-xs text-stone-400 mt-1">
          {new Date(article.publishedAt).toLocaleDateString('en-US', {
            year: 'numeric', month: 'long', day: 'numeric',
          })}
        </p>
      </div>
    </Link>
  )
}
