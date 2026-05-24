import type { Metadata } from "next"
import { allArticles, platformInfo, Article } from "@/data/articles"
import { Quote, BookOpen, ArrowUpRight, ExternalLink, FileText, GraduationCap, Library, Search } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "How to Cite Vidyasagar Machupalli's Articles | Citation Guide & Bibliography",
  description:
    "Complete citation guide for Vidyasagar Machupalli's 49+ technical articles. MLA, APA, Chicago, and BibTeX citation formats. Find and cite articles on Cloud Architecture, DevOps, AI/ML, and Quantum Computing.",
  keywords: [
    "Vidyasagar Machupalli citations",
    "cite Vidyasagar Machupalli",
    "Vidyasagar Machupalli bibliography",
    "how to cite technical articles",
    "Vidyasagar Machupalli MLA citation",
    "Vidyasagar Machupalli APA citation",
    "Vidyasagar Machupalli BibTeX",
    "technical article citations",
    "cloud architecture references",
  ],
  openGraph: {
    title: "How to Cite Vidyasagar Machupalli's Articles | Complete Citation Guide",
    description:
      "MLA, APA, Chicago, and BibTeX citation formats for 49+ technical articles by Vidyasagar Machupalli. Cloud Architecture, DevOps, AI/ML, and Quantum Computing.",
    type: "website",
    url: "https://vidyasagarmsc.github.io/citations",
  },
  twitter: {
    title: "How to Cite Vidyasagar Machupalli's Articles | Complete Citation Guide",
    description:
      "MLA, APA, Chicago, and BibTeX citation formats for 49+ technical articles by Vidyasagar Machupalli.",
  },
  alternates: {
    canonical: "https://vidyasagarmsc.github.io/citations",
  },
}

function generateCitation(article: Article, format: "mla" | "apa" | "chicago" | "bibtex"): string {
  const author = "Machupalli, Vidyasagar"
  const year = article.isoDate.split("-")[0]

  switch (format) {
    case "mla":
      return `${author}. "${article.title}." <em>${article.platform}</em>, ${article.date}, ${article.url}.`
    case "apa":
      return `Machupalli, V. (${year}). ${article.title}. <em>${article.platform}</em>. ${article.url}`
    case "chicago":
      return `${author}. "${article.title}." ${article.platform}. ${article.date}. ${article.url}.`
    case "bibtex":
      return `@article{machupalli${article.isoDate.replace(/-/g, "")},
  author = {${author}},
  title = {${article.title}},
  journal = {${article.platform}},
  year = {${year}},
  url = {${article.url}}
}`
  }
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How do I cite Vidyasagar Machupalli's articles?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You can cite Vidyasagar Machupalli's articles using MLA, APA, Chicago, or BibTeX formats. Each article on this page has pre-generated citations in all four formats. Simply copy the format you need.",
      },
    },
    {
      "@type": "Question",
      name: "Where does Vidyasagar Machupalli publish technical articles?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Vidyasagar Machupalli publishes technical articles on DZone (as a Most Valuable Blogger), Dev.to, Medium, VMacWrites (personal blog), Substack, and Hackernoon. His content covers Cloud Architecture, DevOps, AI/ML, Quantum Computing, and Developer Tools.",
      },
    },
    {
      "@type": "Question",
      name: "How many articles has Vidyasagar Machupalli published?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Vidyasagar Machupalli has published 49+ technical articles across multiple platforms, reaching over 550,000 readers worldwide. His articles span topics from cloud infrastructure and DevOps to quantum computing and artificial intelligence.",
      },
    },
    {
      "@type": "Question",
      name: "What is Vidyasagar Machupalli's area of expertise?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Vidyasagar Machupalli is an Executive IT Architect and Senior Software Development Manager at IBM with 18+ years of experience. He specializes in Cloud Enterprise Architecture, AI/ML, Quantum Computing, DevOps, and Developer Experience.",
      },
    },
    {
      "@type": "Question",
      name: "How can I find Vidyasagar Machupalli's research articles?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "All of Vidyasagar Machupalli's articles are aggregated on this website. Browse by category (Cloud & DevOps, AI/ML, Quantum Computing, Architecture, Developer Tools, Career & Leadership) or search for specific topics like Terraform, Kubernetes, IBM Cloud, or TensorFlow.",
      },
    },
  ],
}

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Vidyasagar Machupalli",
  alternateName: "Vidyasagar (Sarath Chandra) Machupalli",
  jobTitle: "Executive IT Architect & Senior Software Development Manager",
  affiliation: {
    "@type": "Organization",
    name: "IBM",
  },
  alumniOf: [
    { "@type": "CollegeOrUniversity", name: "BCS, The Chartered Institute for IT" },
  ],
  knowsAbout: [
    "Cloud Architecture",
    "Artificial Intelligence",
    "Quantum Computing",
    "DevOps",
    "Software Development",
    "Enterprise Architecture",
  ],
  url: "https://vidyasagarmsc.github.io",
  sameAs: [
    "https://www.linkedin.com/in/vidyasagarmsc",
    "https://github.com/vidyasagarmsc",
    "https://twitter.com/vidyasagarmsc",
    "https://dzone.com/authors/vidyasagarmsc",
    "https://dev.to/vidyasagarmsc",
  ],
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": "https://vidyasagarmsc.github.io/citations",
  },
}

export default function CitationsPage() {
  const platforms = Object.entries(platformInfo) as [string, { color: string; url: string }][]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <div className="container-main py-12 md:py-20">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex items-center gap-2 text-sm text-muted-foreground">
            <li><Link href="/" className="hover:text-accent transition-colors">Home</Link></li>
            <li aria-hidden="true">/</li>
            <li><Link href="/articles" className="hover:text-accent transition-colors">Articles</Link></li>
            <li aria-hidden="true">/</li>
            <li className="text-foreground font-medium" aria-current="page">Citations</li>
          </ol>
        </nav>

        {/* HERO */}
        <div className="mb-16">
          <span className="label mb-4">
            <GraduationCap className="w-3.5 h-3.5" />
            Citation Guide
          </span>
          <h1 className="display text-4xl sm:text-5xl lg:text-6xl mb-6">
            How to Cite{" "}
            <span className="gradient-text">Vidyasagar Machupalli</span>
            <br />
            Articles & Publications
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl leading-relaxed">
            This page provides complete citation information for all {allArticles.length} technical articles 
            published by <strong className="text-foreground">Vidyasagar Machupalli</strong> (BCS Fellow, Executive IT Architect at IBM). 
            Citations are available in MLA (9th ed.), APA (7th ed.), Chicago (17th ed.), and BibTeX formats 
            for academic referencing and research purposes.
          </p>
        </div>

        {/* QUICK STATS */}
        <div className="glass-card p-6 mb-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-2xl font-bold gradient-text">{allArticles.length}</div>
              <div className="text-sm text-muted-foreground mt-1">Citable Articles</div>
            </div>
            <div>
              <div className="text-2xl font-bold gradient-text">6</div>
              <div className="text-sm text-muted-foreground mt-1">Platforms</div>
            </div>
            <div>
              <div className="text-2xl font-bold gradient-text">{new Set(allArticles.flatMap(a => a.topics)).size}</div>
              <div className="text-sm text-muted-foreground mt-1">Topics</div>
            </div>
            <div>
              <div className="text-2xl font-bold gradient-text">550K+</div>
              <div className="text-sm text-muted-foreground mt-1">Readers</div>
            </div>
          </div>
        </div>

        {/* CITATION FORMATS EXPLAINED */}
        <section className="mb-16">
          <h2 className="display text-2xl sm:text-3xl mb-6">Citation Formats Available</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { name: "MLA (9th ed.)", icon: Library, desc: "Modern Language Association style, commonly used in humanities." },
              { name: "APA (7th ed.)", icon: BookOpen, desc: "American Psychological Association style, used in social sciences." },
              { name: "Chicago (17th ed.)", icon: FileText, desc: "Chicago Manual of Style, used in publishing." },
              { name: "BibTeX", icon: Quote, desc: "Reference management format for LaTeX documents." },
            ].map((fmt, i) => (
              <div key={i} className="bento-item flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                  <fmt.icon className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold">{fmt.name}</h3>
                  <p className="text-sm text-muted-foreground">{fmt.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ABOUT THE AUTHOR */}
        <section className="mb-16 p-6 glass-card">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent to-orange-600 flex items-center justify-center text-white font-bold text-2xl shadow-lg shrink-0">
              VM
            </div>
            <div>
              <h2 className="display text-2xl mb-2">About the Author</h2>
              <p className="text-muted-foreground">
                <strong className="text-foreground">Vidyasagar Machupalli</strong> (BCS Fellow, FBCS) is an 
                Executive IT Architect and Senior Software Development Manager at IBM with 18+ years of 
                experience in enterprise architecture, cloud computing, AI, and developer advocacy. He 
                is a recognized thought leader publishing across DZone (MVB), Dev.to, Medium, and other 
                technical platforms.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            {[
              { label: "LinkedIn", href: "https://linkedin.com/in/vidyasagarmsc" },
              { label: "GitHub", href: "https://github.com/vidyasagarmsc" },
              { label: "DZone", href: "https://dzone.com/authors/vidyasagarmsc" },
              { label: "Dev.to", href: "https://dev.to/vidyasagarmsc" },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline text-sm"
              >
                {link.label} <ExternalLink className="w-3 h-3" />
              </a>
            ))}
          </div>
        </section>

        {/* ALL ARTICLES WITH CITATIONS */}
        <section>
          <h2 className="display text-2xl sm:text-3xl mb-8">
            Complete Bibliography: {allArticles.length} Articles
          </h2>

          <div className="space-y-8">
            {allArticles.map((article) => {
              const platform = platformInfo[article.platform]
              return (
                <div key={article.id} className="bento-item">
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${platform.color}`}>
                      {article.platform}
                    </span>
                    <span className="text-sm text-muted-foreground">{article.date}</span>
                    <span className="text-sm text-muted-foreground">{article.readTime}</span>
                    <Link
                      href={`/articles/${article.slug}`}
                      className="ml-auto text-sm text-accent hover:underline flex items-center gap-1"
                    >
                      View Details <ArrowUpRight className="w-3 h-3" />
                    </Link>
                  </div>

                  <h3 className="font-semibold text-lg mb-2">{article.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{article.description}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {article.topics.map((topic) => (
                      <span key={topic} className="px-2 py-0.5 rounded-md bg-muted text-xs text-muted-foreground">
                        {topic}
                      </span>
                    ))}
                  </div>

                  <details className="group">
                    <summary className="cursor-pointer text-sm font-medium text-accent hover:underline flex items-center gap-2">
                      <Quote className="w-4 h-4" />
                      Show Citation Formats
                    </summary>
                    <div className="mt-4 space-y-4 p-4 rounded-xl bg-muted/50">
                      {(["mla", "apa", "chicago", "bibtex"] as const).map((format) => (
                        <div key={format}>
                          <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider block mb-1">
                            {format === "mla" ? "MLA (9th ed.)" : format === "apa" ? "APA (7th ed.)" : format === "chicago" ? "Chicago (17th ed.)" : "BibTeX"}
                          </span>
                          {format === "bibtex" ? (
                            <pre className="text-xs bg-background p-3 rounded-lg overflow-x-auto">
                              <code>{generateCitation(article, format).replace(/<\/?em>/g, "")}</code>
                            </pre>
                          ) : (
                            <p
                              className="text-sm text-muted-foreground"
                              dangerouslySetInnerHTML={{ __html: generateCitation(article, format) }}
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  </details>
                </div>
              )
            })}
          </div>
        </section>

        {/* FAQ SECTION */}
        <section className="mt-16 p-6 glass-card">
          <h2 className="display text-2xl sm:text-3xl mb-6 flex items-center gap-3">
            <Search className="w-6 h-6 text-accent" />
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {[
              {
                q: "How do I cite a technical article from DZone or Dev.to?",
                a: "Use the MLA, APA, or BibTeX format provided for each article on this page. Include the author name (Machupalli, Vidyasagar), article title in quotes, platform name in italics, publication date, and the direct URL to the article.",
              },
              {
                q: "Can I use these citations in my academic paper?",
                a: "Yes. All citations follow official MLA (9th ed.), APA (7th ed.), Chicago (17th ed.), and BibTeX formatting standards. Verify with your institution's citation guide for any specific requirements.",
              },
              {
                q: "Are there new articles added regularly?",
                a: "Vidyasagar Machupalli publishes new technical articles weekly across multiple platforms. This citation hub is updated automatically every week to include new publications.",
              },
              {
                q: "What citation format should I use for computer science?",
                a: "For computer science and engineering papers, APA (7th ed.) or BibTeX are most commonly used. IEEE format is also common — you can adapt the BibTeX entry or use APA as a base.",
              },
            ].map((faq, i) => (
              <div key={i}>
                <h3 className="font-semibold mb-2">{faq.q}</h3>
                <p className="text-sm text-muted-foreground">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* PLATFORM LINKS */}
        <div className="mt-16 text-center py-8 border-t border-border">
          <p className="text-muted-foreground mb-4">Browse articles on original platforms</p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {platforms.map(([name, info]) => (
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
