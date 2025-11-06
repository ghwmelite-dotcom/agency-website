# Quick Start Guide

## Get Your Agency Site Running in 5 Minutes

### Step 1: Install Dependencies

```bash
cd agency-website
npm install
```

### Step 2: Configure Your Site

Edit `src/config.ts` with your information:

```typescript
export const SITE_CONFIG = {
  name: "Your Agency Name",        // Change this
  tagline: "Your Tagline",         // Change this
  email: "hello@yoursite.com",     // Your email
  phone: "+1 (555) 123-4567",      // Your phone
  // Update social links...
}
```

### Step 3: Customize Design

Edit colors in `src/styles/design-system.css`:

```css
:root {
  --color-primary: #6366f1;      /* Your brand color */
  --color-secondary: #ec4899;    /* Secondary color */
  /* ... */
}
```

### Step 4: Start Development Server

```bash
npm run dev
```

Visit `http://localhost:4321` to see your site!

### Step 5: Customize Content

#### Homepage Hero
Edit `src/components/Hero.astro` - change text, stats, badges

#### Services
Update `src/config.ts` services array with your offerings

#### Portfolio
Edit `src/components/Portfolio.astro` - add your projects

#### Blog Posts
Add `.mdx` files in `src/content/blog/`

### Step 6: Deploy to Cloudflare (Free!)

```bash
# Build the site
npm run build

# Push to GitHub
git init
git add .
git commit -m "Initial commit"
git push

# Deploy on Cloudflare Pages
# See DEPLOYMENT.md for detailed instructions
```

## What's Included

✅ **Homepage** with hero, services, portfolio, contact
✅ **Blog** with MDX support
✅ **Booking System** for consultations
✅ **AI Chatbot** for customer service
✅ **Contact Forms** with API endpoints
✅ **Dark/Light Mode** toggle
✅ **Fully Responsive** design
✅ **SEO Optimized** with meta tags
✅ **Performance Optimized** (targets Lighthouse 100)

## Next Steps

### Add Your Content
1. Replace placeholder images with your own
2. Write your first blog post
3. Add your portfolio projects
4. Update team information

### Set Up Email
1. Sign up for [Resend](https://resend.com) (free tier)
2. Get API key
3. Add to environment variables
4. Uncomment email code in API functions

### Enable Analytics
1. Add Cloudflare Web Analytics
2. Or integrate Google Analytics
3. Track conversions and user behavior

### Customize Further
- Add more pages (About, Team, Careers, etc.)
- Integrate with CMS (Sanity, Contentful)
- Add e-commerce with Stripe
- Implement newsletter signup
- Add more animations

## File Structure

```
agency-website/
├── src/
│   ├── components/      # Reusable components
│   ├── layouts/         # Page layouts
│   ├── pages/          # Routes (index, blog, booking)
│   ├── content/        # Blog posts (MDX)
│   ├── styles/         # Global styles
│   └── config.ts       # Site configuration
├── functions/          # Cloudflare Workers API
├── public/            # Static assets
└── package.json       # Dependencies
```

## Common Tasks

### Add a new page
Create file in `src/pages/about.astro`

### Add a blog post
Create file in `src/content/blog/my-post.mdx`

### Change colors
Edit `src/styles/design-system.css`

### Update navigation
Edit `src/components/Header.astro`

### Modify footer
Edit `src/components/Footer.astro`

## Troubleshooting

**Port already in use?**
```bash
# Kill process on port 4321
npx kill-port 4321
```

**Build errors?**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

**Styles not updating?**
- Hard refresh browser (Ctrl+Shift+R)
- Clear Astro cache: `rm -rf .astro`

## Get Help

- 📖 [Astro Documentation](https://docs.astro.build)
- 🌐 [Cloudflare Pages Docs](https://developers.cloudflare.com/pages)
- 💬 [Discord Community](https://discord.gg/cloudflare)

## Performance Tips

- Optimize images (use WebP/AVIF)
- Minimize JavaScript
- Enable caching headers
- Use CDN for assets
- Lazy load images
- Minimize CSS

Your site is ready to dominate! 🚀
