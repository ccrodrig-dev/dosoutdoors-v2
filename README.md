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

### Setup

1. Clone the repo:
   ```bash
   git clone git@github.com:ccrodrig-dev/dosoutdoors-v2.git
   cd dosoutdoors-v2
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create your local environment file:
   ```bash
   cp .env.local.example .env.local
   ```

4. Fill in `.env.local` with the real values:
   ```
   NEXT_PUBLIC_SANITY_PROJECT_ID=s9ktrlr6
   NEXT_PUBLIC_SANITY_DATASET=production
   NEXT_PUBLIC_GA_ID=G-G5WN7R80CH          # Google Analytics — omit to disable locally
   SANITY_WRITE_TOKEN=...                   # only needed for migration scripts
   ```

   The Sanity project ID and dataset are safe to commit (they're public-facing). The write token is a secret — never commit it.

5. Start the dev server:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000)

The embedded Sanity Studio editor is at [http://localhost:3000/studio](http://localhost:3000/studio). You can create and edit articles there during local development.

### Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Yes | Sanity project ID (from sanity.io/manage) |
| `NEXT_PUBLIC_SANITY_DATASET` | Yes | Sanity dataset name (e.g. `production`) |
| `NEXT_PUBLIC_GA_ID` | No | Google Analytics 4 measurement ID |
| `SANITY_WRITE_TOKEN` | Scripts only | Sanity API token with write access |

`NEXT_PUBLIC_GA_ID` must also be set in Vercel for analytics to work in production (Vercel Dashboard → Project → Settings → Environment Variables).

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
