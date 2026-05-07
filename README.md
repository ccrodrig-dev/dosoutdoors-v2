# Dos Outdoors

Travel blog for [dosoutdoors.com](https://dosoutdoors.com) — Two on the Go.

## Stack

| Layer | Tool |
|-------|------|
| Framework | Next.js 16 (App Router, TypeScript) |
| Styling | Tailwind CSS 4 |
| CMS | Sanity v3 (Studio embedded at `/studio`) |
| Hosting | Vercel (auto-deploy on push to `main`) |
| DNS | AWS Route 53 → Vercel |
| Domain registrar | GoDaddy |
| Images | Sanity CDN (new) + S3 fallback for legacy articles |

## Local Development

1. Clone the repo
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create `.env.local` from the example:
   ```bash
   cp .env.local.example .env.local
   ```
4. Fill in your values in `.env.local`:
   ```
   NEXT_PUBLIC_SANITY_PROJECT_ID=s9ktrlr6
   NEXT_PUBLIC_SANITY_DATASET=production
   SANITY_WRITE_TOKEN=your_write_token_here   # only needed for migration scripts
   ```
5. Run the dev server:
   ```bash
   npm run dev
   ```
6. Open [http://localhost:3000](http://localhost:3000)

The Sanity Studio editor runs at [http://localhost:3000/studio](http://localhost:3000/studio).

## Deployment

Any push to `main` automatically deploys to production via Vercel.

For previewing changes before going live, push to a feature branch — Vercel builds a preview URL automatically.

**Required environment variables in Vercel:**
- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET`

## Content Management

Articles are managed in Sanity Studio at `dosoutdoors.com/studio`.

To create a new article: open Studio → click **+** → fill in title, slug, excerpt, main image, and body → Publish. The site revalidates automatically.

## Project Structure

```
app/
├── page.tsx                    # Homepage
├── about/page.tsx              # About page
├── articles/page.tsx           # Articles list
├── article/[slug]/page.tsx     # Individual article (SSG)
├── privacy-cookie-policy/      # Privacy policy
├── studio/[[...tool]]/         # Sanity Studio
└── layout.tsx                  # Root layout (NavBar + Footer)

components/
├── NavBar.tsx
├── Footer.tsx
├── ArticleCard.tsx             # Article preview card
└── ArticleBody.tsx             # Portable Text renderer

sanity/
├── schemaTypes/article.ts      # Article content schema
└── lib/
    ├── client.ts               # Sanity client
    ├── queries.ts              # GROQ queries
    └── image.ts                # Image URL builder

scripts/
├── migrate-articles.ts         # One-time migration from old JS file
└── patch-images.ts             # One-time S3 URL patch
```

## Migration Scripts (one-time, already run)

These were used to migrate content from the old React/MongoDB stack and should not need to be run again:

```bash
npm run migrate        # Migrated 5 articles from article-content.js into Sanity
npm run patch-images   # Patched legacy S3 image URLs onto migrated articles
```

## Pending

- Upload main images for all 5 legacy articles to Sanity CDN (currently using S3 fallback URLs), then shut down S3 bucket
- Design polish pass
