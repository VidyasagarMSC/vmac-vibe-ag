
"use client"

import { motion } from "framer-motion"
import { portfolioData } from "@/data/portfolio"
import { Briefcase, GraduationCap, Users, Coffee, MapPin, Calendar, ExternalLink } from "lucide-react"

const stats = [
    { label: "Years Experience", value: "18+", icon: Calendar },
    { label: "Companies", value: "5", icon: Briefcase },
    { label: "Open Source Projects", value: "87+", icon: Users },
]

export function About() {
    return (
        <section id="about" className="py-24 bg-secondary/20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">

                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="mb-16"
                >
                    <h2 className="text-3xl font-bold font-heading mb-2">About Me</h2>
                    <p className="text-muted-foreground">The story behind the code.</p>
                </motion.div>

                <div className="grid lg:grid-cols-3 gap-12">

                    {/* Main Content - 2 columns */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="lg:col-span-2 space-y-8"
                    >
                        {/* Bio Card */}
                        <div className="bg-background border border-border rounded-xl p-8">
                            <div className="flex items-start gap-4 mb-6">
                                <div className="h-16 w-16 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center text-2xl font-bold text-primary font-heading shrink-0">
                                    VM
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-foreground">{portfolioData.personal.name}</h3>
                                    <p className="text-muted-foreground">{portfolioData.personal.role}</p>
                                    <div className="flex items-center gap-1 mt-1 text-sm text-muted-foreground">
                                        <MapPin className="h-3 w-3" />
                                        <span>{portfolioData.personal.location}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="prose prose-lg dark:prose-invert max-w-none">
                                <p className="text-muted-foreground leading-relaxed mb-6">
                                    {portfolioData.about.description}
                                </p>

                                <p className="text-muted-foreground leading-relaxed">
                                    Beyond my day job at IBM, I&apos;m an active open-source contributor with <span className="text-foreground font-medium">87+ repositories</span> on GitHub,
                                    and a frequent speaker at international tech conferences. I believe in the power of community and giving back
                                    through mentorship, blogging, and knowledge sharing.
                                </p>
                            </div>

                            {/* Social Links */}
                            <div className="flex flex-wrap gap-3 mt-8 pt-6 border-t border-border">
                                {Object.entries(portfolioData.personal.social).map(([platform, link]) => (
                                    link && (
                                        <a
                                            key={platform}
                                            href={link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-secondary/50 hover:bg-secondary text-sm font-medium text-muted-foreground hover:text-foreground transition-colors capitalize"
                                        >
                                            {platform}
                                            <ExternalLink className="h-3 w-3" />
                                        </a>
                                    )
                                ))}
                            </div>
                        </div>

                        {/* What I Do */}
                        <div className="grid sm:grid-cols-2 gap-6">
                            <div className="bg-background border border-border rounded-xl p-6 hover:border-primary/30 transition-colors">
                                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                                    <Briefcase className="h-5 w-5 text-primary" />
                                </div>
                                <h4 className="font-bold text-foreground mb-2">Solution Architecture</h4>
                                <p className="text-sm text-muted-foreground">
                                    Designing scalable, resilient systems that bridge business needs with technical excellence.
                                </p>
                            </div>

                            <div className="bg-background border border-border rounded-xl p-6 hover:border-primary/30 transition-colors">
                                <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                                    <Users className="h-5 w-5 text-accent" />
                                </div>
                                <h4 className="font-bold text-foreground mb-2">Developer Advocacy</h4>
                                <p className="text-sm text-muted-foreground">
                                    Empowering developers through docs, talks, and tools that make complex tech accessible.
                                </p>
                            </div>

                            <div className="bg-background border border-border rounded-xl p-6 hover:border-primary/30 transition-colors">
                                <div className="h-10 w-10 rounded-lg bg-green-500/10 flex items-center justify-center mb-4">
                                    <GraduationCap className="h-5 w-5 text-green-500" />
                                </div>
                                <h4 className="font-bold text-foreground mb-2">Research & Quantum</h4>
                                <p className="text-sm text-muted-foreground">
                                    Exploring the mathematical foundations and frontiers of AI and Quantum Computing.
                                </p>
                            </div>

                            <div className="bg-background border border-border rounded-xl p-6 hover:border-primary/30 transition-colors">
                                <div className="h-10 w-10 rounded-lg bg-orange-500/10 flex items-center justify-center mb-4">
                                    <Coffee className="h-5 w-5 text-orange-500" />
                                </div>
                                <h4 className="font-bold text-foreground mb-2">Open Source</h4>
                                <p className="text-sm text-muted-foreground">
                                    Contributing to and maintaining projects that help the developer community thrive.
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Sidebar - Stats & Interests */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="space-y-6"
                    >
                        {/* Stats */}
                        <div className="bg-background border border-border rounded-xl p-6">
                            <h4 className="font-bold text-foreground mb-6">Quick Stats</h4>
                            <div className="space-y-6">
                                {stats.map((stat, index) => (
                                    <div key={index} className="flex items-center gap-4">
                                        <div className="h-12 w-12 rounded-lg bg-secondary flex items-center justify-center">
                                            <stat.icon className="h-5 w-5 text-primary" />
                                        </div>
                                        <div>
                                            <div className="text-2xl font-bold text-foreground font-heading">{stat.value}</div>
                                            <div className="text-sm text-muted-foreground">{stat.label}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Interests */}
                        <div className="bg-background border border-border rounded-xl p-6">
                            <h4 className="font-bold text-foreground mb-4">Areas of Interest</h4>
                            <div className="flex flex-wrap gap-2">
                                {portfolioData.about.interests.map((interest, index) => (
                                    <span
                                        key={index}
                                        className="px-3 py-1.5 rounded-full bg-secondary/50 text-sm font-medium text-foreground border border-border/50"
                                    >
                                        {interest}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Current Focus */}
                        <div className="bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 rounded-xl p-6">
                            <h4 className="font-bold text-foreground mb-2">Currently</h4>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                Building the future of cloud-native AI applications at IBM, mentoring the next generation of architects, and exploring quantum computing possibilities.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
