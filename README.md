# JobsHub - Modern Job Portal

A modern, SEO-friendly job portal built with Next.js 14 and Markdown. All content is managed via Markdown files - no traditional backend required.

## Features

- **24+ Sample Job Listings** - Various categories including IT, Marketing, Sales, Remote jobs
- **SEO Optimized** - Dynamic meta tags, sitemap.xml, structured data (JobPosting schema)
- **AdSense Ready** - Ad placeholders in header, sidebar, and content areas
- **Legal Pages** - About, Contact, Privacy Policy, Terms, Disclaimer
- **Filters & Search** - Filter by location, tags, salary; Search by keywords
- **Responsive Design** - Mobile-first, modern UI with Tailwind CSS
- **Static Export** - Pre-rendered HTML for fast loading and easy deployment

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- gray-matter (Markdown frontmatter parsing)
- marked (Markdown to HTML conversion)
- Lucide React (Icons)

## Project Structure

```
├── app/                    # Next.js app router pages
│   ├── page.tsx           # Homepage with job listings
│   ├── layout.tsx         # Root layout with SEO
│   ├── globals.css        # Global styles
│   ├── about/             # About page
│   ├── contact/           # Contact page
│   ├── privacy-policy/     # Privacy Policy
│   ├── terms-and-conditions/  # Terms
│   ├── disclaimer/         # Disclaimer
│   ├── jobs/[slug]/        # Dynamic job detail pages
│   ├── sitemap.ts          # Sitemap generator
│   └── robots.ts           # Robots.txt generator
├── components/             # React components
│   ├── Header.tsx         # Site header with search
│   ├── Footer.tsx         # Site footer
│   ├── JobCard.tsx        # Job listing card
│   ├── Sidebar.tsx        # Sidebar with latest jobs, tags, CTA
│   └── Filters.tsx        # Job filters component
├── content/               # Markdown content
│   ├── jobs/              # Job listings (24 jobs)
│   └── pages/             # Static pages (about, contact, etc.)
├── lib/                   # Utility functions
│   └── markdown.ts        # Markdown parsing functions
├── next.config.ts         # Next.js config (static export)
└── package.json           # Dependencies
```

## Getting Started

### Prerequisites

- Node.js 18+ (Node 20+ recommended)
- npm or yarn

### Installation

1. Clone or download the project
2. Install dependencies:
   ```bash
   npm install
   ```

3. Run development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000)

### Building for Production

```bash
npm run build
```

This creates a `dist` folder with static HTML files ready for deployment.

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Connect repository to [Vercel](https://vercel.com)
3. Deploy - auto-deploys on every push

### Netlify

1. Push to GitHub
2. Connect to [Netlify](https://netlify.com)
3. Build command: `npm run build`
4. Publish directory: `dist`

### GitHub Pages

1. Update `next.config.ts` with your base path:
   ```ts
   const nextConfig = {
     output: 'export',
     distDir: 'dist',
     basePath: '/your-repo-name',
   }
   ```

2. Build and deploy the `dist` folder

## Adding New Jobs

1. Create a new folder in `content/jobs/your-job-slug/`
2. Create `index.md` inside the folder with this format:

```yaml
---
id: unique-job-id
title: Job Title
company: Company Name
location: Remote / City
salary: ₹20,000 - ₹40,000/month
date: 2026-04-10
tags: [WFH, Fresher]
description: Short SEO summary
logo: ./logo.png
banner: ./banner.jpg
---

## Job Description

Detailed job description here...

## Eligibility

- Point 1
- Point 2

## Salary Details

Salary information...

## Selection Process

Interview process details...

## How to Apply

Application instructions...
```

3. Run `npm run build` to regenerate static pages

## Customization

### Update Branding
- Edit `app/layout.tsx` - Change site name and meta tags
- Edit `components/Header.tsx` - Update logo
- Edit `components/Footer.tsx` - Update footer content

### Update Colors
- Edit `app/globals.css` - Modify CSS variables
- Default primary color: Blue (#2563eb)

### Add AdSense
1. Replace ad placeholder divs with your AdSense code
2. Placeholders are in:
   - `app/page.tsx` (top and bottom)
   - `components/Sidebar.tsx` (sidebar)
   - `app/jobs/[slug]/page.tsx` (within job content)

### Update Social Links
- Edit `components/Sidebar.tsx` - Update WhatsApp and Telegram links

## SEO Features

- Dynamic meta titles and descriptions for each page
- Open Graph tags for social sharing
- Sitemap.xml auto-generated
- Robots.txt configured
- JobPosting structured data (Schema.org)
- Semantic HTML5 structure
- Mobile-friendly responsive design

## License

MIT License - Feel free to use for personal or commercial projects.

## Support

For issues or questions, please open an issue on GitHub or contact support.
