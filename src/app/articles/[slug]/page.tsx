import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { allArticles, getArticleBySlug, getRelatedArticles, platformInfo } from "@/data/articles"
import { ArrowLeft, ExternalLink, Calendar, Clock, Hash, Quote } from "lucide-react"
import Link from "next/link"

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return allArticles.map((article) => ({
    slug: article.slug,
  }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const article = getArticleBySlug(slug)
  if (!article) return {}

  return {
    title: `${article.title} | Vidyasagar Machupalli`,
    description: article.description,
    keywords: article.topics,
    authors: [{ name: "Vidyasagar Machupalli", url: "https://vidyasagarmsc.github.io" }],
    openGraph: {
      title: article.title,
      description: article.description,
      type: "article",
      publishedTime: article.isoDate,
      url: `https://vidyasagarmsc.github.io/articles/${article.slug}`,
      siteName: "Vidyasagar Machupalli",
      tags: article.topics,
    },
    twitter: {
      title: article.title,
      description: article.description,
      card: "summary_large_image",
    },
    alternates: {
      canonical: `https://vidyasagarmsc.github.io/articles/${article.slug}`,
    },
  }
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params
  const article = getArticleBySlug(slug)
  if (!article) notFound()

  const relatedArticles = getRelatedArticles(article)
  const platform = platformInfo[article.platform]

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: article.title,
    description: article.description,
    author: {
      "@type": "Person",
      name: "Vidyasagar Machupalli",
      url: "https://vidyasagarmsc.github.io",
    },
    datePublished: article.isoDate,
    dateModified: article.isoDate,
    url: `https://vidyasagarmsc.github.io/articles/${article.slug}`,
    publisher: {
      "@type": "Organization",
      name: article.platform,
      url: new URL(article.url).origin,
    },
    keywords: article.topics.join(", "),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://vidyasagarmsc.github.io/articles/${article.slug}`,
    },
  }

  const citationJsonLd = {
    "@context": "https://schema.org",
    "@type": "ScholarlyArticle",
    headline: article.title,
    author: {
      "@type": "Person",
      name: "Vidyasagar Machupalli",
    },
    datePublished: article.isoDate,
    url: article.url,
    publisher: article.platform,
    description: article.description,
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(citationJsonLd) }}
      />
      <div className="container-main py-12 md:py-20">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex items-center gap-2 text-sm text-muted-foreground">
            <li><Link href="/" className="hover:text-accent transition-colors">Home</Link></li>
            <li aria-hidden="true">/</li>
            <li><Link href="/articles" className="hover:text-accent transition-colors">Articles</Link></li>
            <li aria-hidden="true">/</li>
            <li className="text-foreground font-medium truncate max-w-[200px]" aria-current="page">
              {article.title}
            </li>
          </ol>
        </nav>

        {/* Back Link */}
        <Link
          href="/articles"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to all articles
        </Link>

        <article className="max-w-3xl">
          {/* Meta */}
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${platform.color}`}>
              {article.platform}
            </span>
            <span className="flex items-center gap-1 text-sm text-muted-foreground">
              <Calendar className="w-3.5 h-3.5" />
              {article.date}
            </span>
            <span className="flex items-center gap-1 text-sm text-muted-foreground">
              <Clock className="w-3.5 h-3.5" />
              {article.readTime}
            </span>
          </div>

          {/* Title */}
          <h1 className="display text-3xl sm:text-4xl lg:text-5xl mb-6">
            {article.title}
          </h1>

          {/* Description */}
          <p className="text-lg text-muted-foreground leading-relaxed mb-8">
            {article.description}
          </p>

          {/* Citation Block */}
          <div className="glass-card p-6 mb-8">
            <h2 className="text-sm font-semibold text-muted-foreground mb-4 flex items-center gap-2">
              <Quote className="w-4 h-4" />
              How to Cite This Article
            </h2>
            <div className="space-y-2 text-sm">
              <p className="text-muted-foreground">
                <strong className="text-foreground">MLA:</strong> Machupalli, Vidyasagar. &ldquo;{article.title}.&rdquo;{" "}
                <em>{article.platform}</em>, {article.date}, {article.url}.
              </p>
              <p className="text-muted-foreground">
                <strong className="text-foreground">APA:</strong> Machupalli, V. ({article.isoDate.split("-")[0]}).{" "}
                {article.title}. <em>{article.platform}</em>. {article.url}
              </p>
              <p className="text-muted-foreground">
                <strong className="text-foreground">BibTeX:</strong>{" "}
                <code className="text-xs bg-muted px-2 py-0.5 rounded">
                  @article&#123;machupalli{article.isoDate.replace(/-/g, "")},
                  author = &#123;Machupalli, Vidyasagar&#125;,
                  title = &#123;{article.title}&#125;,
                  journal = &#123;{article.platform}&#125;,
                  year = &#123;{article.isoDate.split("-")[0]}&#125;,
                  url = &#123;{article.url}&#125;&#125;
                </code>
              </p>
            </div>
          </div>

          {/* Topics */}
          <div className="mb-8">
            <h2 className="text-sm font-semibold text-muted-foreground mb-3 flex items-center gap-2">
              <Hash className="w-4 h-4" />
              Topics
            </h2>
            <div className="flex flex-wrap gap-2">
              {article.topics.map((topic) => (
                <span
                  key={topic}
                  className="px-3 py-1.5 rounded-full bg-muted text-sm hover:bg-accent/10 hover:text-accent transition-colors cursor-default"
                >
                  {topic}
                </span>
              ))}
            </div>
          </div>

          {/* Read Original */}
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-accent inline-flex items-center gap-2"
          >
            <ExternalLink className="w-4 h-4" />
            Read Original on {article.platform}
          </a>
        </article>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <section className="mt-20 pt-12 border-t border-border">
            <h2 className="display text-2xl mb-6">Related Articles</h2>
            <div className="grid md:grid-cols-3 gap-4">
              {relatedArticles.map((related) => {
                const relPlatform = platformInfo[related.platform]
                return (
                  <Link
                    key={related.id}
                    href={`/articles/${related.slug}`}
                    className="bento-item group"
                  >
                    <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium mb-3 ${relPlatform.color}`}>
                      {related.platform}
                    </span>
                    <h3 className="font-semibold group-hover:text-accent transition-colors line-clamp-2 mb-2">
                      {related.title}
                    </h3>
                    <p className="text-xs text-muted-foreground">{related.date}</p>
                  </Link>
                )
              })}
            </div>
          </section>
        )}
      </div>
    </>
  )
}
