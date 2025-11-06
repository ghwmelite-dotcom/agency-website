# Deployment Guide

## Quick Deploy to Cloudflare Pages

### 1. Prerequisites
- GitHub account
- Cloudflare account (free tier works!)
- Git installed locally

### 2. Push to GitHub

```bash
cd agency-website
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/agency-website.git
git push -u origin main
```

### 3. Deploy on Cloudflare Pages

1. Log in to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Go to **Workers & Pages** → **Create Application** → **Pages**
3. Connect to GitHub and select your repository
4. Configure build settings:
   - **Framework preset**: Astro
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
5. Click **Save and Deploy**

Your site will be live in ~2 minutes at `your-project.pages.dev`!

### 4. Custom Domain (Optional)

1. In Cloudflare Pages, go to **Custom domains**
2. Click **Set up a custom domain**
3. Enter your domain (e.g., `yoursite.com`)
4. Follow DNS configuration instructions

### 5. Environment Variables

Add these in **Settings** → **Environment variables**:

```
RESEND_API_KEY=your_resend_api_key_here
SITE_URL=https://yoursite.com
```

For email functionality, sign up at [Resend.com](https://resend.com) and get an API key.

### 6. Enable Workers AI for Chatbot

1. Go to **Workers & Pages** → Your site → **Settings**
2. Click **Functions** → **AI Bindings**
3. Add binding name: `AI`
4. Save and redeploy

Uncomment the AI section in `wrangler.toml` and the AI code in `functions/api/chat.ts`.

### 7. Optional: D1 Database for Storing Data

To store contacts and bookings in a database:

```bash
# Create D1 database
wrangler d1 create agency-db

# Run migrations
wrangler d1 execute agency-db --file=./schema.sql
```

Create `schema.sql`:

```sql
CREATE TABLE contacts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT,
  service TEXT,
  message TEXT NOT NULL,
  created_at TEXT NOT NULL
);

CREATE TABLE bookings (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  date TEXT NOT NULL,
  time TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'pending',
  created_at TEXT NOT NULL
);
```

Add the database ID to `wrangler.toml` and uncomment the D1 sections.

## Performance Optimizations

### Image Optimization
- Use Cloudflare Images for automatic optimization
- Enable WebP/AVIF conversion
- Set up responsive images

### Caching
Cloudflare automatically caches static assets. For API routes, add cache headers:

```javascript
headers: {
  'Cache-Control': 'public, max-age=3600'
}
```

### Analytics
Enable **Cloudflare Web Analytics** (free, privacy-friendly):
1. Go to **Analytics & Logs** → **Web Analytics**
2. Add your site
3. Copy the script tag to `BaseLayout.astro`

## Monitoring

- **Pages Dashboard**: View deployments, analytics, and logs
- **Real-time Logs**: `wrangler tail` for live debugging
- **Error Tracking**: Integrate Sentry or similar

## Cost Estimate

With Cloudflare's free tier:
- **Hosting**: $0
- **Workers/Functions**: 100,000 requests/day free
- **D1 Database**: 5GB storage free
- **Workers AI**: Limited free tier

For most small-medium sites, you'll stay under **$5/month**.

## Troubleshooting

### Build fails
- Check Node version (requires 18+)
- Run `npm install` locally first
- Check build logs in Cloudflare dashboard

### Functions not working
- Verify file structure: `functions/api/*.ts`
- Check function logs in dashboard
- Test locally: `npm run preview`

### AI chatbot not responding
- Ensure AI binding is configured
- Check you're using the correct model name
- Verify API limits aren't exceeded

## Local Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Test production build
npm run build && npm run preview
```

Visit `http://localhost:4321`

## CI/CD

Cloudflare Pages automatically deploys on every push to `main`. Preview deployments are created for pull requests.

## Support

- [Cloudflare Docs](https://developers.cloudflare.com/pages/)
- [Astro Docs](https://docs.astro.build/)
- [Discord Community](https://discord.gg/cloudflare)
