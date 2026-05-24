import type { Metadata } from "next"
import { allArticles, getAllTopics, platformInfo } from "@/data/articles"
import { BookOpen, ExternalLink, Clock, Hash, Rss } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Articles & Publications by Vidyasagar Machupalli",
  description:
    "Complete collection of technical articles, tutorials, and publications by Vidyasagar Machupalli. Covering Cloud Architecture, DevOps, AI/ML, Quantum Computing, and Developer Tools across DZone, Dev.to, Medium, and more.",
  keywords: [
    "Vidyasagar Machupalli articles",
    "Vidyasagar Machupalli publications",
    "Cloud Architecture articles",
    "DevOps tutorials",
    "IBM Cloud",
    "Terraform",
    "Kubernetes",
    "Quantum Computing",
    "technical blog",
    "DZone MVB",
  ],
  openGraph: {
    title: "Articles & Publications by Vidyasagar Machupalli",
    description:
      "Complete collection of technical articles covering Cloud Architecture, DevOps, AI/ML, Quantum Computing, and Developer Tools.",
    type: "website",
    url: "https://vidyasagarmsc.github.io/articles",
  },
  twitter: {
    title: "Articles & Publications by Vidyasagar Machupalli",
    description:
      "Complete collection of technical articles covering Cloud Architecture, DevOps, AI/ML, Quantum Computing, and Developer Tools.",
  },
  alternates: {
    canonical: "https://vidyasagarmsc.github.io/articles",
  },
}

const topics = getAllTopics()
const categories = [...new Set(allArticles.map((a) => a.category))] as string[]
const totalViews = "550K+"
const totalArticles = allArticles.length

export default function ArticlesPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Articles & Publications by Vidyasagar Machupalli",
    description: metadata.description,
    url: "https://vidyasagarmsc.github.io/articles",
    author: {
      "@type": "Person",
      name: "Vidyasagar Machupalli",
      url: "https://vidyasagarmsc.github.io",
    },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: allArticles.map((article, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "TechArticle",
          headline: article.title,
          description: article.description,
          author: {
            "@type": "Person",
            name: "Vidyasagar Machupalli",
          },
          datePublished: article.isoDate,
          url: `https://vidyasagarmsc.github.io/articles/${article.slug}`,
          publisher: {
            "@type": "Organization",
            name: article.platform,
          },
        },
      })),
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="container-main py-12 md:py-20">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex items-center gap-2 text-sm text-muted-foreground">
            <li><Link href="/" className="hover:text-accent transition-colors">Home</Link></li>
            <li aria-hidden="true">/</li>
            <li className="text-foreground font-medium" aria-current="page">Articles</li>
          </ol>
        </nav>

        {/* Header */}
        <div className="mb-12">
          <span className="label mb-4">
            <BookOpen className="w-3.5 h-3.5" />
            Research & Publications
          </span>
          <h1 className="display text-4xl sm:text-5xl lg:text-6xl mb-4">
            All Articles &<br />
            <span className="gradient-text">Technical Writing</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            A comprehensive collection of {totalArticles} technical articles, tutorials, and thought-leadership pieces 
            published across DZone, Dev.to, Medium, and more. Total readership: <strong className="text-foreground">{totalViews}</strong>.
          </p>
        </div>

        {/* Stats Bar */}
        <div className="glass-card p-6 mb-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-2xl font-bold gradient-text">{totalArticles}</div>
              <div className="text-sm text-muted-foreground mt-1">Total Articles</div>
            </div>
            <div>
              <div className="text-2xl font-bold gradient-text">{totalViews}</div>
              <div className="text-sm text-muted-foreground mt-1">Reader Views</div>
            </div>
            <div>
              <div className="text-2xl font-bold gradient-text">{topics.length}</div>
              <div className="text-sm text-muted-foreground mt-1">Topics Covered</div>
            </div>
            <div>
              <div className="text-2xl font-bold gradient-text">{Object.keys(platformInfo).length}</div>
              <div className="text-sm text-muted-foreground mt-1">Platforms</div>
            </div>
          </div>
        </div>

        {/* Category Filter */}
        <div className="mb-8">
          <h2 className="text-sm font-semibold text-muted-foreground mb-3 flex items-center gap-2">
            <Hash className="w-4 h-4" />
            Browse by Category
          </h2>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <a
                key={category}
                href={`#cat-${category.replace(/\s+/g, "-").toLowerCase()}`}
                className="px-4 py-2 rounded-full bg-muted hover:bg-accent/10 hover:text-accent transition-colors text-sm font-medium"
              >
                {category}
              </a>
            ))}
          </div>
        </div>

        {/* Articles by Category */}
        {categories.map((category) => {
          const catArticles = allArticles.filter((a) => a.category === category)
          return (
            <section
              key={category}
              id={`cat-${category.replace(/\s+/g, "-").toLowerCase()}`}
              className="mb-16"
            >
              <h2 className="display text-2xl sm:text-3xl mb-6">{category}</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {catArticles.map((article) => {
                  const platform = platformInfo[article.platform]
                  return (
                    <Link
                      key={article.id}
                      href={`/articles/${article.slug}`}
                      className="bento-item group"
                    >
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${platform.color}`}>
                          {article.platform}
                        </span>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground shrink-0">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {article.readTime}
                          </span>
                          <span>{article.date}</span>
                        </div>
                      </div>
                      <h3 className="font-semibold group-hover:text-accent transition-colors line-clamp-2 mb-2">
                        {article.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                        {article.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {article.topics.slice(0, 3).map((topic) => (
                          <span
                            key={topic}
                            className="px-2 py-0.5 rounded-md bg-muted text-xs text-muted-foreground"
                          >
                            {topic}
                          </span>
                        ))}
                      </div>
                    </Link>
                  )
                })}
              </div>
            </section>
          )
        })}

        {/* RSS Feed Link */}
        <div className="text-center py-12 border-t border-border">
          <p className="text-muted-foreground mb-4">
            Subscribe to stay updated with the latest articles
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {Object.entries(platformInfo).map(([name, info]) => (
              <a
                key={name}
                href={info.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline text-sm"
              >
                <ExternalLink className="w-4 h-4" />
                {name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
