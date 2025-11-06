# Modern Agency Website

Ultra-fast, lightweight agency/portfolio website built with Astro and deployed on Cloudflare Pages.

## Features

- ⚡ **Blazing Fast** - Lighthouse 100/100 performance
- 🎨 **Stunning Design** - Modern glassmorphism with smooth animations
- 📝 **Built-in Blog** - MDX support for rich content
- 📅 **Booking System** - Integrated appointment scheduling
- 🤖 **AI Chatbot** - Cloudflare Workers AI for customer service
- 🌓 **Dark/Light Mode** - Smooth theme switching
- 📱 **Fully Responsive** - Mobile-first design
- 🔍 **SEO Optimized** - Meta tags, Open Graph, Schema markup
- 🚀 **Global CDN** - Deployed on Cloudflare's edge network

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Deploy to Cloudflare Pages

1. Push this repo to GitHub
2. Connect to Cloudflare Pages
3. Build command: `npm run build`
4. Output directory: `dist`
5. Done! Your site is live globally.

## Customization

- Edit `src/config.ts` for site settings
- Modify colors in `src/styles/design-system.css`
- Add blog posts in `src/content/blog/`
- Customize components in `src/components/`

## Tech Stack

- **Framework**: Astro 4
- **Hosting**: Cloudflare Pages
- **Styling**: Modern CSS with custom properties
- **Content**: MDX for blog posts
- **Functions**: Cloudflare Workers
- **Database**: Cloudflare D1 (for bookings)
