import { portfolioData } from "@/data/portfolio"
import Link from "next/link"
import { Github, Linkedin, Twitter } from "lucide-react"

const NAV = ["About", "Experience", "Projects", "Articles", "Contact"]

export function Footer() {
    const socials = [
        { href: portfolioData.personal.social.github, icon: Github, label: "GitHub" },
        { href: portfolioData.personal.social.linkedin, icon: Linkedin, label: "LinkedIn" },
        { href: portfolioData.personal.social.twitter, icon: Twitter, label: "Twitter" },
    ]

    return (
        <footer className="bg-muted/50 border-t border-border py-12">
            <div className="container-main">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="text-center md:text-left">
                        <Link href="/" className="flex items-center gap-2">
                            <span className="text-xl font-bold">Vidyasagar</span>
                            <span className="text-accent text-2xl font-bold">.</span>
                        </Link>
                        <p className="text-sm text-muted-foreground mt-2">
                            {portfolioData.personal.role}
                        </p>
                    </div>

                    <nav className="flex flex-wrap items-center justify-center gap-4">
                        {NAV.map(item => (
                            <Link
                                key={item}
                                href={`#${item.toLowerCase()}`}
                                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                            >
                                {item}
                            </Link>
                        ))}
                    </nav>

                    <div className="flex items-center gap-3">
                        {socials.map((social, i) => (
                            social.href && (
                                <a
                                    key={i}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={social.label}
                                    className="p-2 rounded-lg bg-muted hover:bg-accent/10 hover:text-accent transition-colors"
                                >
                                    <social.icon className="w-5 h-5" />
                                </a>
                            )
                        ))}
                    </div>
                </div>

                <div className="mt-8 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
                    <p>© {new Date().getFullYear()} Vidyasagar Machupalli. All rights reserved.</p>
                    <p>Built with Next.js & Tailwind CSS</p>
                </div>
            </div>
        </footer>
    )
}