# Polkadot Uruguay 🇺🇾

Official Polkadot community website for Uruguay. Built with Astro, featuring bilingual content (Spanish/English), dark mode, and Polkadot.com-inspired design.

## 🚀 Quick Start

### Option 1: Using Nix Flakes (Recommended)

If you have Nix with flakes enabled:

```bash
# Enter the development environment
nix develop

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

With direnv (automatic environment loading):

```bash
# Allow direnv for this directory (first time only)
direnv allow

# Dependencies will be loaded automatically
pnpm install
pnpm dev
```

### Option 2: Manual Setup

Requirements:
- Node.js 22+
- pnpm (or npm)

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview
```

## 🎨 Features

- **Bilingual**: Spanish (default) and English support
- **Dark Mode**: Automatic detection + manual toggle
- **Content Collections**: Type-safe MDX articles
- **Newsletter**: Mailchimp integration
- **SEO Optimized**: Meta tags, Open Graph, structured data
- **Responsive**: Mobile-first design
- **Accessible**: WCAG compliant with skip links and ARIA labels

## 📁 Project Structure

```
/
├── public/
│   ├── fonts/          # DM Serif Display, DM Sans, JetBrains Mono
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── layout/     # Header, Footer
│   │   ├── article/    # Article cards, grids
│   │   └── ui/         # Reusable UI components
│   ├── content/
│   │   └── news/
│   │       ├── es/     # Spanish articles
│   │       └── en/     # English articles
│   ├── i18n/
│   │   └── ui.ts       # Translation strings
│   ├── layouts/
│   │   └── BaseLayout.astro
│   ├── pages/
│   │   ├── index.astro              # Spanish homepage
│   │   ├── noticias/                # Spanish news
│   │   ├── en/                      # English pages
│   │   └── api/
│   │       └── newsletter.ts        # Mailchimp API
│   └── styles/
│       └── global.css
├── .env                 # Environment variables (gitignored)
├── astro.config.mjs     # Astro + i18n configuration
├── tailwind.config.ts   # Polkadot design system
└── flake.nix           # Nix development environment
```

## 🎨 Design System

### Colors

**Polkadot Brand:**
- Accent: `#ff2867`
- Warm grey scale: `grey-50` to `grey-950`

**Uruguay Accents:**
- Blue: `#0038A8`
- Sky: `#74ACDF`

### Typography

- **Headlines**: DM Serif Display
- **Body**: DM Sans
- **Code**: JetBrains Mono

### Design Patterns

Following Polkadot.com guidelines:
- Section padding: `py-20` or `py-24`
- Content max-width: `max-w-5xl` or `max-w-6xl`
- Cards: `rounded-xl` with `border` and `p-6`
- Alternating section backgrounds

## 📝 Configuration

### 1. Download Fonts

See `public/fonts/README.md` for instructions on downloading:
- DM Serif Display (400, 400 italic)
- DM Sans (variable: 300-700)
- JetBrains Mono (variable: 400-600)

### 2. Configure Mailchimp (Optional)

Create or update `.env`:

```env
MAILCHIMP_API_KEY=your_api_key_here
MAILCHIMP_LIST_ID=your_list_id_here
MAILCHIMP_SERVER=us1
```

Get these values from your Mailchimp account:
- **API Key**: Account > Extras > API keys
- **List ID**: Audience > Settings > Audience name and defaults
- **Server**: From your Mailchimp URL (e.g., `us1.admin.mailchimp.com`)

## 🌍 i18n (Internationalization)

### URL Structure

- Spanish (default): `/`, `/noticias`, `/nosotros`, `/comunidad`
- English: `/en`, `/en/news`, `/en/about`, `/en/community`

### Adding Content

Spanish article:
```markdown
---
title: 'Título del Artículo'
description: 'Descripción breve'
pubDate: 2025-12-29
author: 'Tu Nombre'
tags: ['polkadot', 'web3']
lang: 'es'
featured: false
relatedArticle: 'article-slug-in-english'
---

Contenido del artículo...
```

Place in: `src/content/news/es/titulo-del-articulo.mdx`

### Adding Translations

Update `src/i18n/ui.ts`:

```typescript
export const ui = {
  es: {
    'key': 'Texto en español',
  },
  en: {
    'key': 'Text in English',
  },
};
```

## 🧞 Commands

All commands run from project root:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `pnpm install`           | Install dependencies                              |
| `pnpm dev`               | Start dev server at `localhost:4321`              |
| `pnpm build`             | Build production site to `./dist/`                |
| `pnpm preview`           | Preview build locally before deploying            |
| `pnpm astro ...`         | Run Astro CLI commands                            |

## 🚀 Deployment

The site is a static site and can be deployed to:

- **Vercel**: Connect GitHub repo, auto-deploys
- **Netlify**: Drag & drop `dist/` folder or connect repo
- **Cloudflare Pages**: Connect repo, builds automatically
- **GitHub Pages**: Use GitHub Actions workflow

### Build Command
```bash
pnpm build
```

### Output Directory
```
dist/
```

### Environment Variables

Don't forget to set environment variables in your deployment platform:
- `MAILCHIMP_API_KEY`
- `MAILCHIMP_LIST_ID`
- `MAILCHIMP_SERVER`

## 🛠️ Development with Nix

### Installing Nix

If you don't have Nix installed:

```bash
# Install Nix (multi-user installation)
sh <(curl -L https://nixos.org/nix/install) --daemon

# Enable flakes (add to ~/.config/nix/nix.conf or /etc/nix/nix.conf)
experimental-features = nix-command flakes
```

### Using direnv (Optional but Recommended)

Automatically load the Nix environment when entering the directory:

```bash
# Install direnv
nix profile install nixpkgs#direnv

# Hook into your shell (add to ~/.bashrc or ~/.zshrc)
eval "$(direnv hook bash)"  # for bash
eval "$(direnv hook zsh)"   # for zsh

# Allow direnv in this project (first time only)
cd /path/to/polkadot-uy
direnv allow
```

Now the environment loads automatically when you `cd` into the project!

## 📦 Tech Stack

- **Framework**: [Astro 5.x](https://astro.build/)
- **Styling**: [Tailwind CSS 4.x](https://tailwindcss.com/)
- **Content**: [MDX](https://mdxjs.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Newsletter**: [Mailchimp API](https://mailchimp.com/developer/)
- **Package Manager**: [pnpm](https://pnpm.io/)
- **Dev Environment**: [Nix Flakes](https://nixos.wiki/wiki/Flakes)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit issues and pull requests.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- Design inspired by [Polkadot.com](https://polkadot.com)
- Built with ❤️ in Uruguay 🇺🇾
- Powered by the [Polkadot](https://polkadot.network) ecosystem

---

**Polkadot Uruguay** - Educación, Conexión e Innovación en Web3
