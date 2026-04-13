"use client"

import { motion } from "framer-motion"
import { portfolioData } from "@/data/portfolio"
import { Mic2, Users, Globe2, MessageSquare, Video, ArrowUpRight, Award } from "lucide-react"
import { SpotlightCard } from "@/components/ui/SpotlightCard"
import { Magnetic } from "@/components/ui/Magnetic"

const SPEAKING_STATS = [
    { label: "Global Stages", value: "20+", icon: Globe2 },
    { label: "Minds Reached", value: "550K+", icon: Users },
    { label: "Keynotes", value: "15+", icon: Mic2 },
    { label: "Advocacy Score", value: "Platinum", icon: Award },
]

export function Advocacy() {
    return (
        <section id="advocacy" className="relative overflow-hidden" style={{ paddingBlock: 'var(--section-py)' }}>
            <div className="container mx-auto max-w-6xl relative z-10">
                
                <div className="grid lg:grid-cols-12 gap-12 items-center mb-16">
                    {/* Left — Narrative */}
                    <div className="lg:col-span-7">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                        >
                            <span className="label font-bold uppercase tracking-widest text-[10px] mb-4">
                                <Mic2 className="h-3 w-3" aria-hidden="true" /> Global Presence
                            </span>
                            <h2 className="display text-5xl sm:text-7xl md:text-8xl mt-4 tracking-tighter leading-[0.85] mb-8">
                                Thought leadership<br />
                                <span className="gradient-text">on a global scale</span>.
                            </h2>
                            <p className="text-foreground/60 text-lg leading-relaxed max-w-xl mb-10">
                                Beyond architecture, I am a vocal advocate for the future of technology. From keynote stages at IBM Think to coaching a new generation of engineers, I bridge the gap between technical complexity and community enablement.
                            </p>
                            
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                                {SPEAKING_STATS.map((stat, i) => (
                                    <div key={i} className="flex flex-col gap-1">
                                        <div className="flex items-center gap-2 text-primary">
                                            <stat.icon className="h-4 w-4" />
                                            <span className="text-xl font-black tracking-tight">{stat.value}</span>
                                        </div>
                                        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">{stat.label}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    {/* Right — Interactive Stage Card */}
                    <div className="lg:col-span-5 relative">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="relative z-10"
                        >
                            <SpotlightCard className="p-8 bg-card/50 backdrop-blur-sm border-border/50">
                                <h3 className="font-bold text-lg mb-6 flex items-center justify-between">
                                    Recent Stages
                                    <span className="text-[9px] font-mono font-black text-primary bg-primary/10 px-2 py-0.5 rounded-full">LIVE</span>
                                </h3>
                                
                                <div className="space-y-4">
                                    {portfolioData.speaking.map((talk, i) => (
                                        <Magnetic key={i} strength={0.05}>
                                            <div className="group p-4 rounded-xl bg-muted/30 border border-transparent hover:border-primary/20 hover:bg-muted/50 transition-all cursor-default">
                                                <div className="flex justify-between items-start mb-1">
                                                    <h4 className="font-black text-sm tracking-tight">{talk.event}</h4>
                                                    <span className="text-[10px] font-mono text-muted-foreground">{talk.year}</span>
                                                </div>
                                                <p className="text-[11px] text-foreground/50 font-medium mb-3">{talk.topic}</p>
                                                <div className="flex items-center justify-between">
                                                    <span className="text-[9px] font-black text-primary uppercase tracking-widest">{talk.role}</span>
                                                    <ArrowUpRight className="h-3 w-3 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                                                </div>
                                            </div>
                                        </Magnetic>
                                    ))}
                                </div>

                                <div className="mt-8 text-center pt-6 border-t border-border/20">
                                    <p className="text-[10px] font-bold text-muted-foreground mb-4">WANT TO BOOK FOR A KEYNOTE?</p>
                                    <a href="#contact" className="btn-primary w-full text-xs font-black">
                                        Request Speaking Engagement
                                    </a>
                                </div>
                            </SpotlightCard>
                        </motion.div>
                        
                        {/* Decorative background circle */}
                        <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl -z-10" />
                    </div>
                </div>
            </div>
        </section>
    )
}
