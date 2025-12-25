# Welcome to Your Miaoda Project
Miaoda Application Link URL
    URL:https://medo.dev/projects/app-8ghbg8tk16o1

# DevNest - Developer Tools Platform

A production-ready, high-performance developer tools platform providing essential utilities for developers worldwide.

## Features

- **JSON Formatter & Validator** - Format and validate JSON with real-time error detection
- **Base64 Encoder/Decoder** - Encode and decode Base64 strings instantly
- **Regex Tester** - Test regular expressions with live match highlighting
- **URL Encoder/Decoder** - Encode and decode URL strings for safe transmission
- **Code Minifier** - Minify HTML, CSS, and JavaScript to reduce file size
- **Color Picker & Converter** - Pick colors and convert between HEX, RGB, and HSL formats
- **Markdown Previewer** - Write Markdown with live preview rendering

## Tech Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Routing**: React Router v6

## Design Features

- 🌙 Dark mode as default with light mode toggle
- ⚡ Lightning-fast performance with local processing
- 🔒 Privacy-first - all data stays in your browser
- 📱 Fully responsive design for all devices
- 🎨 Modern, developer-focused UI with electric blue accents
- ♿ Accessible with keyboard navigation support

## Project Directory

```
├── README.md                  # Documentation
├── index.html                 # Entry HTML file
├── package.json               # Package management
├── src/                       # Source code directory
│   ├── App.tsx                # Main app component
│   ├── main.tsx               # Entry point
│   ├── routes.tsx             # Route configuration
│   ├── index.css              # Global styles & design tokens
│   ├── components/            # React components
│   │   ├── layouts/           # Layout components
│   │   │   ├── TopNavigation.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── MainLayout.tsx
│   │   └── ui/                # shadcn/ui components
│   ├── contexts/              # React contexts
│   │   └── ThemeContext.tsx   # Theme management
│   ├── hooks/                 # Custom React hooks
│   │   └── use-local-storage.ts
│   ├── lib/                   # Utility libraries
│   │   ├── tool-utils.ts      # Tool utility functions
│   │   ├── tools-data.ts      # Tools configuration
│   │   └── utils.ts           # General utilities
│   ├── pages/                 # Page components
│   │   ├── HomePage.tsx
│   │   ├── AboutPage.tsx
│   │   ├── PrivacyPage.tsx
│   │   └── tools/             # Tool pages
│   └── types/                 # TypeScript type definitions
└── vite.config.ts             # Vite configuration
```

## Development Guidelines

### Environment Requirements

```bash
# Node.js ≥ 20
# npm ≥ 10
# Example:
node -v   # v20.18.3
npm -v    # 10.8.2
```

### Local Development

```bash
# Step 1: Install dependencies
npm install

# Step 2: Start development server
npm run dev

# Step 3: Open browser to http://localhost:5173
```

### Build for Production

```bash
# Build the application
npm run build

# Preview production build locally
npm run preview
```

### Code Quality

```bash
# Run linter
npm run lint

# Type checking
npm run type-check
```

## Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Visit [vercel.com](https://vercel.com) and sign in
3. Click "New Project"
4. Import your GitHub repository
5. Vercel will auto-detect Vite and configure build settings
6. Click "Deploy"

**Build Settings:**
- Framework Preset: Vite
- Build Command: `npm run build`
- Output Directory: `dist`

### Deploy to Netlify

1. Push your code to GitHub
2. Visit [netlify.com](https://netlify.com) and sign in
3. Click "Add new site" → "Import an existing project"
4. Connect to your GitHub repository
5. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
6. Click "Deploy site"

### Static Hosting

The built files in the `dist` folder can be deployed to any static hosting service:
- GitHub Pages
- Cloudflare Pages
- AWS S3 + CloudFront
- Firebase Hosting

## Performance Optimization

- All tools process data locally in the browser
- No external API calls or server dependencies
- Optimized bundle size with code splitting
- Lazy loading for heavy components
- Image optimization for fast loading

## SEO Features

- Semantic HTML structure
- Proper meta tags and Open Graph data
- Clean, descriptive URLs
- Sitemap ready (add sitemap.xml for production)
- Fast page load times for better rankings

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

Copyright © 2025 DevNest. All rights reserved.
