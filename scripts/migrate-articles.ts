/**
 * One-time migration: converts articles from the old article-content.js into Sanity documents.
 *
 * Run with:
 *   npx tsx --env-file=.env.local scripts/migrate-articles.ts
 *
 * Requires SANITY_WRITE_TOKEN in .env.local (Editor token from sanity.io/manage → API → Tokens)
 */

import { createClient } from '@sanity/client'
import { readFileSync } from 'fs'
import { resolve } from 'path'
import { randomUUID } from 'crypto'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_WRITE_TOKEN!,
  useCdn: false,
})

// ---------------------------------------------------------------------------
// Load source data
// ---------------------------------------------------------------------------

const SOURCE = resolve(
  '/Users/christianrodriguez/Documents/Travel_Blog_AWS/professional-travel-blog/src/pages/article-content.js'
)

const src = readFileSync(SOURCE, 'utf8').replace(/export default articles;?\s*$/, '')
// eslint-disable-next-line no-new-func
const articles: any[] = new Function(src + '; return articles;')()

// ---------------------------------------------------------------------------
// Portable Text helpers
// ---------------------------------------------------------------------------

const key = () => randomUUID().replace(/-/g, '').slice(0, 12)

function block(style: string, text: string, marks: string[] = [], markDefs: any[] = []) {
  return {
    _type: 'block',
    _key: key(),
    style,
    children: [{ _type: 'span', _key: key(), text: text.trim(), marks }],
    markDefs,
  }
}

function bulletItem(text: string, href?: string) {
  const markDefs: any[] = []
  const marks: string[] = []
  if (href) {
    const k = key()
    markDefs.push({ _type: 'link', _key: k, href, blank: true })
    marks.push(k)
  }
  return {
    _type: 'block',
    _key: key(),
    style: 'normal',
    listItem: 'bullet',
    level: 1,
    children: [{ _type: 'span', _key: key(), text: text.trim(), marks }],
    markDefs,
  }
}

function externalImage(url: string, caption?: string) {
  return { _type: 'externalImage', _key: key(), url, alt: '', caption: caption ?? '' }
}

// ---------------------------------------------------------------------------
// Convert one article_body item → Portable Text block(s)
// ---------------------------------------------------------------------------

function convertItem(item: any): any[] {
  if (item.subHeading) return [block('h2', item.subHeading)]

  if (item.paragraph) return [block('normal', item.paragraph)]

  if (item.boldPar) return [block('normal', item.boldPar, ['strong'])]

  if (item.ArticleTextList) {
    return (item.ArticleTextList as string[]).map((t) => bulletItem(t))
  }

  if (item.ArticleTextListSquare) {
    return (item.ArticleTextListSquare as Array<string | { linkURL: string; text: string }>).map(
      (entry) =>
        typeof entry === 'string'
          ? bulletItem(entry)
          : bulletItem(entry.text, entry.linkURL)
    )
  }

  if (item.image) return [externalImage(item.image, item.subtext ?? '')]

  if (item.AAfiliateItem) {
    const blocks: any[] = []
    if (item.title) {
      const k = key()
      blocks.push({
        _type: 'block',
        _key: key(),
        style: 'h3',
        children: [{ _type: 'span', _key: key(), text: item.title, marks: item.url ? [k] : [] }],
        markDefs: item.url ? [{ _type: 'link', _key: k, href: item.url, blank: true }] : [],
      })
    }
    if (item.details) blocks.push(block('normal', item.details))
    if (item.recommend) blocks.push(block('normal', item.recommend))
    return blocks
  }

  if (item.moreLink) {
    const k = key()
    return [{
      _type: 'block',
      _key: key(),
      style: 'normal',
      children: [{ _type: 'span', _key: key(), text: item.description ?? 'Related article', marks: [k] }],
      markDefs: [{ _type: 'link', _key: k, href: item.link, blank: false }],
    }]
  }

  // SectionDivider, unknown → skip
  return []
}

// ---------------------------------------------------------------------------
// Tag + date mapping
// ---------------------------------------------------------------------------

const META: Record<string, { tags: string[]; publishedAt: string }> = {
  'camping-in-bear-country':                             { tags: ['camping', 'tips-guides'],         publishedAt: '2021-06-01T00:00:00Z' },
  'camping-essentials-checklist':                        { tags: ['camping', 'gear', 'tips-guides'],  publishedAt: '2021-06-15T00:00:00Z' },
  'recommended-backpacking-gear':                        { tags: ['backpacking', 'gear'],             publishedAt: '2021-07-01T00:00:00Z' },
  '25-things-you-must-know-italy':                       { tags: ['travel', 'tips-guides'],           publishedAt: '2021-09-01T00:00:00Z' },
  '11-free-budget-friendly-experiences-youll-love-in-cancun': { tags: ['travel', 'tips-guides'],     publishedAt: '2021-07-30T00:00:00Z' },
}

// ---------------------------------------------------------------------------
// Build & upload
// ---------------------------------------------------------------------------

async function migrate() {
  console.log(`Migrating ${articles.length} articles to Sanity project ${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}...\n`)

  for (const article of articles) {
    const meta = META[article.name] ?? { tags: [], publishedAt: new Date().toISOString() }
    const body = (article.article_body as any[]).flatMap(convertItem)
    const excerpt = (article.content?.[0] ?? '').slice(0, 300)

    const doc = {
      _type: 'article',
      title: article.title.trim(),
      slug: { _type: 'slug', current: article.name },
      publishedAt: meta.publishedAt,
      // mainImage intentionally omitted — set via Studio after migration
      // Original S3 URL: article.main_image
      excerpt,
      tags: meta.tags,
      body,
    }

    try {
      const result = await client.create(doc)
      console.log(`✓ Created: "${article.title.trim()}" (${result._id})`)
    } catch (err: any) {
      console.error(`✗ Failed: "${article.title.trim()}" — ${err.message}`)
    }
  }

  console.log('\nDone. Open /studio to review and update main images.')
}

migrate().catch(console.error)
