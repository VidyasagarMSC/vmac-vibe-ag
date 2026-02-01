
# Vidyasagar Machupalli - Portfolio Website

A modern, high-performance personal portfolio website built with Next.js, Tailwind CSS, and Framer Motion.

## 🚀 Tech Stack

- **Framework:** [Next.js 14+](https://nextjs.org/) (App Router)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Theming:** [next-themes](https://github.com/pacocoursey/next-themes) (Dark/Light mode)
- **Deployment:** Vercel

## 🛠️ Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📂 Project Structure

```
src/
├── app/                  # App Router pages and layout
├── components/           # React components
│   ├── layout/           # Navbar, Footer
│   ├── sections/         # Homepage sections (Hero, About, etc.)
│   └── ui/               # Reusable UI elements
├── data/                 # Static content/data
└── lib/                  # Utilities (cn, etc.)
```

## 🎨 Customization

### Content
Edit `src/data/portfolio.ts` to update personal information, projects, skills, and social links.

### Styling
- Colors and fonts are defined in `src/app/globals.css` using CSS variables.
- Tailwind configuration adapts to these variables.

## 📦 Deployment

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.
