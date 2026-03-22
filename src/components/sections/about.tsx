"use client"

import { useLayoutEffect, useRef } from "react"
import { portfolioData } from "@/data/portfolio"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { motion } from "framer-motion"
import { ArrowRight, MapPin, Zap } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

const BIG_STATS = [
    { value: "18+", label: "Years of impact", sub: "Enterprise to startup" },
    { value: "550K+", label: "Minds reached", sub: "Across 6 platforms" },
    { value: "87+", label: "Open source repos", sub: "GitHub contributions" },
    { value: "BCS", label: "Fellow", sub: "Chartered IT Institute" },
]

// Split a sentence into word spans for GSAP animation
function splitWords(text: string) {
    return text.split(" ").map((word, i) => (
        <span key={i} className="word-wrap">
            <span className="word">{word}&nbsp;</span>
        </span>
    ))
}

export function About() {
    const sectionRef = useRef<HTMLElement>(null)
    const textRef = useRef<HTMLDivElement>(null)
    const statsRef = useRef<HTMLDivElement>(null)
    const bgNumRef = useRef<HTMLDivElement>(null)

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const words = textRef.current?.querySelectorAll(".word")
            if (words?.length) {
                gsap.fromTo(
                    words,
                    { y: "110%", opacity: 0 },
                    {
                        y: "0%",
                        opacity: 1,
                        stagger: 0.03,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: textRef.current,
                            start: "top 80%",
                            end: "bottom 50%",
                            scrub: 0.5,
                        },
                    }
                )
            }

            // Stats slam in
            gsap.fromTo(
                statsRef.current?.children ?? [],
                { y: 60, opacity: 0, scale: 0.9 },
                {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    stagger: 0.12,
                    ease: "back.out(1.7)",
                    scrollTrigger: {
                        trigger: statsRef.current,
                        start: "top 85%",
                    },
                }
            )

            // Parallax background number
            if (bgNumRef.current) {
                gsap.to(bgNumRef.current, {
                    x: "15%",
                    ease: "none",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: true,
                    },
                })
            }
        }, sectionRef)
        return () => ctx.revert()
    }, [])

    return (
        <section id="about" ref={sectionRef} className="py-32 relative overflow-hidden">
            {/* Big parallax number */}
            <div ref={bgNumRef}
                className="absolute top-20 -left-[5%] text-[22vw] font-black font-heading select-none pointer-events-none opacity-[0.025] leading-none z-0 whitespace-nowrap">
                ABOUT
            </div>

            <div className="container mx-auto max-w-6xl relative z-10">
                <div className="grid lg:grid-cols-2 gap-20 items-center">
                    {/* Left — word-reveal bio */}
                    <div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="mb-8"
                        >
                            <span className="label"><Zap className="h-3 w-3" /> The Story</span>
                        </motion.div>

                        <h2 className="display text-4xl md:text-5xl mb-10 leading-[1.0]">
                            The mind<br />
                            <span className="gradient-text">behind the code</span>.
                        </h2>

                        {/* Word-reveal paragraphs */}
                        <div ref={textRef} className="space-y-6 text-foreground/65 leading-relaxed text-base md:text-lg">
                            <p className="leading-relaxed">
                                {splitWords("I'm an Executive IT Architect, Senior Product Manager & Developer Advocate at IBM — a role I've held since 2015 after working across Mahindra Satyam, CDC Software, Indecomm, and Dell.")}
                            </p>
                            <p className="leading-relaxed">
                                {splitWords("I specialize in AI, Quantum Computing, Cloud Architecture, and Developer Experience. I translate theoretical complexity into tangible business value — then write about it for 550K+ readers worldwide.")}
                            </p>
                            <p className="leading-relaxed">
                                {splitWords("In 2024 I was elected a BCS Fellow and certified as a Distinguished Architect by The Open Group — two of the field's highest recognitions.")}
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-2 mt-8">
                            {portfolioData.about.interests.map((interest, i) => (
                                <motion.span
                                    key={i}
                                    initial={{ opacity: 0, scale: 0.7 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.07 }}
                                    className="skill-chip"
                                >
                                    {interest}
                                </motion.span>
                            ))}
                        </div>
                    </div>

                    {/* Right — 3D tilt identity card */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, type: "spring", bounce: 0.2 }}
                    >
                        <motion.div
                            whileHover={{ rotateY: -8, rotateX: 5 }}
                            transition={{ type: "spring", stiffness: 200, damping: 20 }}
                            className="glass border border-border rounded-3xl p-8 depth-shadow-lg"
                            style={{ transformPerspective: 1000 }}
                        >
                            {/* Identity */}
                            <div className="flex items-center gap-4 pb-6 border-b border-border mb-6">
                                <div className="h-14 w-14 rounded-2xl flex items-center justify-center font-black text-xl font-heading text-white"
                                    style={{ background: "linear-gradient(135deg, #5046e5, #7c3aed)" }}>
                                    VM
                                </div>
                                <div>
                                    <p className="font-bold text-foreground">{portfolioData.personal.name}</p>
                                    <p className="text-xs text-foreground/50 mt-0.5">{portfolioData.personal.role}</p>
                                    <div className="flex items-center gap-1 mt-1.5 text-xs text-foreground/40">
                                        <MapPin className="h-2.5 w-2.5" /> Global · Hybrid
                                    </div>
                                </div>
                            </div>

                            {/* Stats */}
                            <div ref={statsRef} className="grid grid-cols-2 gap-3">
                                {BIG_STATS.map((s, i) => (
                                    <div key={i} className="rounded-xl p-4 border border-border" style={{ background: "rgba(var(--primary-rgb),0.05)" }}>
                                        <div className="text-2xl font-black gradient-text font-heading">{s.value}</div>
                                        <div className="text-xs font-semibold text-foreground mt-0.5">{s.label}</div>
                                        <div className="text-[10px] text-foreground/40">{s.sub}</div>
                                    </div>
                                ))}
                            </div>

                            {/* Status */}
                            <div className="mt-6 pt-5 border-t border-border flex items-center gap-3">
                                <span className="relative flex h-2.5 w-2.5 shrink-0">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
                                </span>
                                <div>
                                    <p className="text-xs font-bold text-foreground">Currently building at IBM</p>
                                    <p className="text-[10px] text-foreground/40">Open to speaking engagements worldwide</p>
                                </div>
                                <a href="#contact" className="ml-auto flex items-center gap-1 text-xs font-semibold text-primary hover:underline">
                                    Contact <ArrowRight className="h-3 w-3" />
                                </a>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
