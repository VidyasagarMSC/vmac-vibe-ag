"use client"

import { useLayoutEffect, useRef } from "react"
import { portfolioData } from "@/data/portfolio"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Briefcase } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

const companyColors: Record<string, { color: string; grad: string }> = {
    IBM: { color: "#0f62fe", grad: "linear-gradient(135deg,rgba(15,98,254,0.15),rgba(15,98,254,0.02))" },
    Dell: { color: "#007db8", grad: "linear-gradient(135deg,rgba(0,125,184,0.15),rgba(0,125,184,0.02))" },
    Indecomm: { color: "#7c3aed", grad: "linear-gradient(135deg,rgba(124,58,237,0.15),rgba(124,58,237,0.02))" },
    "CDC Software": { color: "#10b981", grad: "linear-gradient(135deg,rgba(16,185,129,0.15),rgba(16,185,129,0.02))" },
    "Mahindra Satyam": { color: "#f59e0b", grad: "linear-gradient(135deg,rgba(245,158,11,0.15),rgba(245,158,11,0.02))" },
}
function getCompany(name: string) {
    const k = Object.keys(companyColors).find(k => name.includes(k))
    return k ? companyColors[k] : { color: "#6b7280", grad: "none" }
}

export function Experience() {
    const containerRef = useRef<HTMLElement>(null)
    const trackRef = useRef<HTMLDivElement>(null)
    const progressRef = useRef<HTMLDivElement>(null)

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const track = trackRef.current
            if (!track) return

            const totalSlide = track.scrollWidth - window.innerWidth

            // Horizontal scroll pin
            gsap.to(track, {
                x: -totalSlide,
                ease: "none",
                scrollTrigger: {
                    trigger: containerRef.current,
                    pin: true,
                    scrub: 0.8,
                    end: () => `+=${totalSlide + 200}`,
                    onUpdate: (self) => {
                        if (progressRef.current) {
                            progressRef.current.style.width = `${self.progress * 100}%`
                        }
                    },
                },
            })

            // Each card pops in as it comes into horizontal view
            track.querySelectorAll<HTMLElement>(".era-card").forEach((card, i) => {
                gsap.fromTo(
                    card,
                    { opacity: 0, y: 40, scale: 0.92 },
                    {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        ease: "back.out(1.4)",
                        scrollTrigger: {
                            trigger: containerRef.current,
                            start: `top+=${i * 200} center`,
                            end: `top+=${i * 200 + 200} center`,
                            scrub: 0.5,
                            containerAnimation: gsap.to(track, { x: -totalSlide, ease: "none" }),
                        },
                    }
                )
            })
        }, containerRef)
        return () => ctx.revert()
    }, [])

    return (
        <section id="experience" ref={containerRef} className="h-screen overflow-hidden relative">
            {/* Section header — fixed while pinned */}
            <div className="absolute top-10 left-0 right-0 flex items-center justify-between px-8 md:px-16 z-20 pointer-events-none">
                <div>
                    <span className="label"><Briefcase className="h-3 w-3" /> Journey</span>
                    <h2 className="display text-4xl md:text-5xl mt-2">
                        18 years of <span className="gradient-text">building</span>.
                    </h2>
                </div>
                {/* Progress rail */}
                <div className="hidden md:block">
                    <div className="text-xs font-mono text-foreground/30 mb-2">SCROLL TO EXPLORE →</div>
                    <div className="h-0.5 w-40 bg-border rounded-full overflow-hidden">
                        <div ref={progressRef} className="h-full rounded-full transition-none"
                            style={{ background: "linear-gradient(90deg, var(--primary), var(--accent))", width: "0%" }} />
                    </div>
                </div>
            </div>

            {/* Horizontal track */}
            <div ref={trackRef} className="h-scroll-track absolute top-0 left-0 h-full flex items-center pt-32 gap-6 pl-8 md:pl-16 pr-[20vw]">
                {/* Origin marker */}
                <div className="era-card flex-shrink-0 flex flex-col justify-center h-60 w-28">
                    <div className="text-xs font-mono text-foreground/20 mb-2">BORN</div>
                    <div className="text-5xl font-black font-heading text-foreground/10">2007</div>
                    <div className="mt-3 h-px w-16 bg-border" />
                    <div className="text-xs text-foreground/30 mt-2 font-mono">Hyderabad, IN</div>
                </div>

                {[...portfolioData.experience].reverse().map((job, i) => {
                    const c = getCompany(job.company)
                    const year = job.period.split(" - ")[0]
                    return (
                        <div key={i} className="era-card h-scroll-card flex-shrink-0 w-[340px] md:w-[420px] relative">
                            {/* Year label at top */}
                            <div className="text-5xl font-black font-heading text-foreground/6 mb-4 pointer-events-none select-none">
                                {year}
                            </div>

                            <div className="glass border border-border rounded-3xl p-7 depth-shadow-lg"
                                style={{ background: c.grad }}>
                                {/* Company dot */}
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="h-3 w-3 rounded-full" style={{ backgroundColor: c.color, boxShadow: `0 0 12px ${c.color}80` }} />
                                    <span className="font-mono text-xs" style={{ color: c.color }}>{job.company}</span>
                                    <span className="ml-auto font-mono text-xs text-foreground/30">{job.period}</span>
                                </div>

                                <h3 className="text-xl font-bold font-heading text-foreground mb-3 leading-tight">
                                    {job.role}
                                </h3>

                                <p className="text-sm text-foreground/55 leading-relaxed">
                                    {job.description}
                                </p>

                                {/* Vertical line decoration */}
                                <div className="mt-5 flex items-center gap-2">
                                    <div className="h-px flex-1" style={{ background: `linear-gradient(90deg, ${c.color}40, transparent)` }} />
                                    <span className="text-[9px] font-mono text-foreground/20">#{i + 1} of {portfolioData.experience.length}</span>
                                </div>
                            </div>
                        </div>
                    )
                })}

                {/* Current marker */}
                <div className="era-card flex-shrink-0 flex flex-col justify-center h-60 w-36">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                        </span>
                        <span className="text-xs font-mono text-emerald-400">PRESENT</span>
                    </div>
                    <div className="text-5xl font-black font-heading text-foreground/10">2025</div>
                    <div className="mt-3 h-px w-16 bg-border" />
                    <div className="text-xs text-foreground/30 mt-2 font-mono">IBM, Global</div>
                </div>
            </div>

            {/* Bottom gradient fade */}
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent pointer-events-none z-10" />
        </section>
    )
}
