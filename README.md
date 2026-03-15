# Emoji Maker

AI-powered emoji generator for Slack & Discord. Built with Next.js + SiliconFlow FLUX.1 + Cloudflare Pages.

## Features

- 🎨 AI emoji generation via SiliconFlow FLUX.1-schnell
- ⬇️ One-click download as 128×128 PNG (Slack & Discord ready)
- 🔒 No login required, no image storage
- 📱 Mobile-friendly responsive design
- 🔍 SEO optimized with sitemap & structured data

## Pages

| Route | Description |
|---|---|
| `/` | Homepage with AI generator |
| `/emoji-maker-for-slack` | Slack-focused landing page |
| `/emoji-maker-for-discord` | Discord-focused landing page |

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **AI**: SiliconFlow API (FLUX.1-schnell)
- **Deployment**: Cloudflare Pages

## Local Development

```bash
git clone https://github.com/huazelin713/emoji-maker.git
cd emoji-maker
npm install
cp .env.example .env.local
# Edit .env.local and add your SiliconFlow API key
npm run dev
```

Open http://localhost:3000

## Environment Variables

| Variable | Description |
|---|---|
| `SILICONFLOW_API_KEY` | API key from https://cloud.siliconflow.cn |

## Deploy to Cloudflare Pages

1. Connect this repo to Cloudflare Pages
2. Build command: `npm run build`
3. Output directory: `.next`
4. Add environment variable: `SILICONFLOW_API_KEY`

## Project Structure

```
app/
  page.tsx                        # Homepage
  layout.tsx                      # Root layout + header/footer
  sitemap.ts                      # Auto-generated sitemap
  robots.ts                       # robots.txt
  api/
    generate/route.ts             # SiliconFlow API handler
    proxy-image/route.ts          # Image proxy for CORS
  emoji-maker-for-slack/page.tsx  # Slack landing page
  emoji-maker-for-discord/page.tsx # Discord landing page
components/
  EmojiGenerator.tsx              # Core generator component
docs/
  PRD.md                          # MVP requirements document
```
