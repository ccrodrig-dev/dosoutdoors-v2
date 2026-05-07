/**
 * Patches existing Sanity article documents with their original S3 main image URLs.
 * Run once: npx tsx --env-file=.env.local scripts/patch-images.ts
 */
import { createClient } from '@sanity/client'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_WRITE_TOKEN!,
  useCdn: false,
})

const images: Record<string, string> = {
  'camping-in-bear-country':
    'https://imagestravelblog.s3.us-east-2.amazonaws.com/CBC_1/CBC_1_MAIN.jpg',
  'camping-essentials-checklist':
    'https://imagestravelblog.s3.us-east-2.amazonaws.com/CEC_2/CEC_2_MAIN.jpeg',
  'recommended-backpacking-gear':
    'https://imagestravelblog.s3.us-east-2.amazonaws.com/RBG_3/RBG_3_MAIN.png',
  '25-things-you-must-know-italy':
    'https://imagestravelblog.s3.us-east-2.amazonaws.com/TYMKBVI_4/TYMKBVI_4_MAIN.jpeg',
  '11-free-budget-friendly-experiences-youll-love-in-cancun':
    'https://imagestravelblog.s3.us-east-2.amazonaws.com/FBFEYLC_5/FBFEYLC_5_MAIN.jpg',
}

async function patch() {
  const docs = await client.fetch(`*[_type == "article"]{ _id, slug }`)
  for (const doc of docs) {
    const url = images[doc.slug?.current]
    if (!url) { console.log(`⚠ No image mapping for ${doc.slug?.current}`); continue }
    await client.patch(doc._id).set({ legacyMainImageUrl: url }).commit()
    console.log(`✓ Patched ${doc.slug?.current}`)
  }
  console.log('Done.')
}

patch().catch(console.error)
