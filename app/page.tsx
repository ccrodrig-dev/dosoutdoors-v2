import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import { client } from '@/sanity/lib/client'
import { allArticlesQuery } from '@/sanity/lib/queries'
import { ArticleSummary } from '@/types/article'
import ArticleCard from '@/components/ArticleCard'

export const metadata: Metadata = {
  openGraph: {
    images: ['https://imagestravelblog.s3.us-east-2.amazonaws.com/en_cover_pic.png'],
  },
}

export default async function HomePage() {
  const articles: ArticleSummary[] = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
    ? await client.fetch(allArticlesQuery, {}, { next: { revalidate: 3600 } }).catch(() => [])
    : []
  const latest = articles.slice(0, 3)

  return (
    <>
      {/* Hero */}
      <section className="relative h-[70vh] min-h-[480px] flex items-center justify-center overflow-hidden">
        <Image
          src="https://imagestravelblog.s3.us-east-2.amazonaws.com/en_cover_pic.png"
          alt="Dos Outdoors hero"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative text-center text-white px-4">
          <h1 className="font-['var(--font-charmonman)'] text-6xl md:text-7xl font-bold drop-shadow-lg mb-4">
            Dos Outdoors
          </h1>
          <p className="text-lg md:text-xl text-white/90 drop-shadow">Two on the Go</p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 py-16">
        {/* Welcome */}
        <section className="flex flex-col md:flex-row gap-10 items-center mb-16">
          <div className="w-full md:w-2/5 rounded-2xl overflow-hidden aspect-square relative">
            <Image
              src="https://imagestravelblog.s3.us-east-2.amazonaws.com/dostogetherjpeg.jpg"
              alt="Dos Outdoors couple"
              fill
              className="object-cover"
            />
          </div>
          <div className="flex-1">
            <h2 className="font-['var(--font-charmonman)'] text-4xl font-bold text-stone-800 mb-4">
              Welcome to our blog!
            </h2>
            <p className="text-stone-600 leading-relaxed mb-4">
              We are a couple who loves to travel the world and embark on outdoor adventures. We enjoy cultural experiences, authentic food, and breathtaking views.
            </p>
            <p className="text-stone-600 leading-relaxed">
              We&apos;ve put together our experiences, tips, and stories to help inspire you on your next adventure.
            </p>
            <Link href="/about" className="inline-block mt-6 text-sm font-medium text-emerald-700 hover:text-emerald-900 underline underline-offset-4">
              More about us →
            </Link>
          </div>
        </section>

        {/* Latest articles */}
        {latest.length > 0 && (
          <section>
            <h2 className="font-['var(--font-charmonman)'] text-4xl font-bold text-stone-800 mb-8">Latest Posts</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
              {latest.map((article) => (
                <ArticleCard key={article._id} article={article} />
              ))}
            </div>
            <div className="text-center">
              <Link
                href="/articles"
                className="inline-block px-8 py-3 rounded-full border-2 border-stone-800 text-stone-800 font-medium hover:bg-stone-800 hover:text-white transition-colors"
              >
                Browse All Articles
              </Link>
            </div>
          </section>
        )}
      </div>
    </>
  )
}
