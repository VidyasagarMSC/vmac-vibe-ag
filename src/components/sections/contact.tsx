
"use client"

import { motion } from "framer-motion"
import { portfolioData } from "@/data/portfolio"

export function Contact() {
    return (
        <section id="contact" className="py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-xl text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="p-8 md:p-12 rounded-2xl bg-gradient-to-br from-secondary/50 to-background border border-border space-y-8"
                >
                    <h2 className="text-3xl font-bold font-heading">Ready to collaborate?</h2>

                    <p className="text-muted-foreground text-lg leading-relaxed">
                        Connect with me on social media or explore my work on GitHub.
                    </p>

                    <div className="flex flex-wrap justify-center gap-4">
                        {Object.entries(portfolioData.personal.social).map(([platform, link]) => (
                            link && (
                                <a
                                    key={platform}
                                    href={link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-6 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 capitalize"
                                >
                                    {platform}
                                </a>
                            )
                        ))}
                    </div>

                    <div className="text-sm text-muted-foreground pt-4">
                        Based in {portfolioData.personal.location}
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
