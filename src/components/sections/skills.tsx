"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { portfolioData } from "@/data/portfolio"
import { Cpu, Database, Layout, Server, Award, Trophy, Star, Sparkles, Zap } from "lucide-react"

const catConfig = [
    { icon: Layout, color: "#5046e5", bg: "rgba(80,70,229,0.1)" },
    { icon: Cpu, color: "#06b6d4", bg: "rgba(6,182,212,0.1)" },
    { icon: Database, color: "#7c3aed", bg: "rgba(124,58,237,0.1)" },
    { icon: Server, color: "#10b981", bg: "rgba(16,185,129,0.1)" },
]

const awardCfg: Record<string, { icon: typeof Trophy; color: string }> = {
    "BCS Fellowship": { icon: Trophy, color: "#f59e0b" },
    "Distinguished Architect": { icon: Star, color: "#0f62fe" },
    "Most Admired Global Indian": { icon: Award, color: "#a855f7" },
    "Globee Awards Judge": { icon: Award, color: "#f97316" },
    "DZone Most Valuable Blogger": { icon: Sparkles, color: "#c42127" },
    "Microsoft MVP Alumni": { icon: Star, color: "#00a4ef" },
    "Intel Software Innovator": { icon: Zap, color: "#0076cc" },
}
const getAward = (title: string) =>
    Object.keys(awardCfg).find(k => title.includes(k))
        ? awardCfg[Object.keys(awardCfg).find(k => title.includes(k))!]
        : { icon: Award, color: "#6b7280" }

// Canvas neural network
function NeuralCanvas() {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext("2d")
        if (!ctx) return

        let w = (canvas.width = canvas.offsetWidth)
        let h = (canvas.height = canvas.offsetHeight)
        let mouse = { x: w / 2, y: h / 2 }

        const NODE_COUNT = 28
        const nodes = Array.from({ length: NODE_COUNT }, () => ({
            x: Math.random() * w,
            y: Math.random() * h,
            vx: (Math.random() - 0.5) * 0.4,
            vy: (Math.random() - 0.5) * 0.4,
            r: 2.5 + Math.random() * 2,
            color: Math.random() > 0.5 ? "#5046e5" : "#06b6d4",
            phase: Math.random() * Math.PI * 2,
        }))

        const onMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect()
            mouse = { x: e.clientX - rect.left, y: e.clientY - rect.top }
        }
        canvas.addEventListener("mousemove", onMove)

        const onResize = () => {
            w = canvas.width = canvas.offsetWidth
            h = canvas.height = canvas.offsetHeight
        }
        window.addEventListener("resize", onResize)

        let raf: number
        let t = 0
        const draw = () => {
            ctx.clearRect(0, 0, w, h)
            t += 0.016

            nodes.forEach((n) => {
                n.x += n.vx; n.y += n.vy
                if (n.x < 0 || n.x > w) n.vx *= -1
                if (n.y < 0 || n.y > h) n.vy *= -1
                // mouse attraction
                const dx = mouse.x - n.x; const dy = mouse.y - n.y
                const dist = Math.sqrt(dx * dx + dy * dy)
                if (dist < 120) {
                    n.vx += dx / dist * 0.015; n.vy += dy / dist * 0.015
                }
                // speed cap
                const speed = Math.sqrt(n.vx * n.vx + n.vy * n.vy)
                if (speed > 1.2) { n.vx = n.vx / speed * 1.2; n.vy = n.vy / speed * 1.2 }
            })

            // Draw connections
            for (let i = 0; i < nodes.length; i++) {
                for (let j = i + 1; j < nodes.length; j++) {
                    const a = nodes[i]; const b = nodes[j]
                    const dx = a.x - b.x; const dy = a.y - b.y
                    const d = Math.sqrt(dx * dx + dy * dy)
                    if (d < 130) {
                        const alpha = (1 - d / 130) * 0.3
                        ctx.beginPath()
                        const grad = ctx.createLinearGradient(a.x, a.y, b.x, b.y)
                        grad.addColorStop(0, `${a.color}${Math.floor(alpha * 255).toString(16).padStart(2, "0")}`)
                        grad.addColorStop(1, `${b.color}${Math.floor(alpha * 255).toString(16).padStart(2, "0")}`)
                        ctx.strokeStyle = grad
                        ctx.lineWidth = 1
                        ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y)
                        ctx.stroke()
                    }
                }
            }

            // Draw nodes
            nodes.forEach((n) => {
                const pulse = Math.sin(t * 2 + n.phase) * 0.5 + 1
                ctx.beginPath()
                ctx.arc(n.x, n.y, n.r * pulse, 0, Math.PI * 2)
                ctx.fillStyle = n.color + "cc"
                ctx.shadowBlur = 8; ctx.shadowColor = n.color
                ctx.fill()
                ctx.shadowBlur = 0
            })

            raf = requestAnimationFrame(draw)
        }
        draw()
        return () => {
            cancelAnimationFrame(raf)
            canvas.removeEventListener("mousemove", onMove)
            window.removeEventListener("resize", onResize)
        }
    }, [])

    return <canvas ref={canvasRef} className="w-full h-full" />
}

export function Skills() {
    return (
        <section id="skills" className="py-32 relative overflow-hidden">
            <div className="container mx-auto max-w-6xl">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-14"
                >
                    <span className="label"><Cpu className="h-3 w-3" /> Stack</span>
                    <h2 className="display text-4xl md:text-6xl mt-3">
                        Tools of the<br />
                        <span className="gradient-text">trade</span>.
                    </h2>
                </motion.div>

                <div className="grid lg:grid-cols-5 gap-10">
                    {/* Left — skill chips + neural canvas */}
                    <div className="lg:col-span-3 space-y-10">
                        {portfolioData.skills.map((cat, ci) => {
                            const cfg = catConfig[ci] || catConfig[0]
                            const Icon = cfg.icon
                            return (
                                <motion.div
                                    key={ci}
                                    initial={{ opacity: 0, x: -30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: ci * 0.1 }}
                                >
                                    <div className="flex items-center gap-2 mb-3">
                                        <span className="p-1.5 rounded-lg" style={{ background: cfg.bg }}>
                                            <Icon className="h-3 w-3" style={{ color: cfg.color }} />
                                        </span>
                                        <span className="text-[10px] font-black font-mono uppercase tracking-widest" style={{ color: cfg.color }}>
                                            {cat.category}
                                        </span>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {cat.items.map((skill, si) => (
                                            <motion.span
                                                key={si}
                                                initial={{ opacity: 0, scale: 0.6 }}
                                                whileInView={{ opacity: 1, scale: 1 }}
                                                viewport={{ once: true }}
                                                transition={{ delay: si * 0.03 + ci * 0.08, type: "spring", bounce: 0.3 }}
                                                className="skill-chip"
                                                style={{ "--primary-rgb": cfg.color.replace("#", "").match(/.{2}/g)!.map(h => parseInt(h, 16)).join(",") } as React.CSSProperties}
                                            >
                                                {skill}
                                            </motion.span>
                                        ))}
                                    </div>
                                </motion.div>
                            )
                        })}

                        {/* Neural canvas */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 }}
                            className="h-36 rounded-2xl glass border border-border overflow-hidden"
                        >
                            <NeuralCanvas />
                        </motion.div>
                    </div>

                    {/* Right — Awards */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ type: "spring", bounce: 0.2 }}
                        className="lg:col-span-2"
                    >
                        <motion.div
                            whileHover={{ rotateY: -5, rotateX: 3 }}
                            transition={{ type: "spring", stiffness: 200, damping: 20 }}
                            className="glass border border-border rounded-3xl p-7 depth-shadow-lg h-full"
                            style={{ transformPerspective: 1000 }}
                        >
                            <h3 className="font-bold font-heading text-lg mb-7 flex items-center gap-2">
                                <Award className="h-5 w-5 text-primary" /> Recognition
                            </h3>

                            {/* Top 2 featured */}
                            <div className="grid grid-cols-2 gap-3 mb-7 pb-6 border-b border-border">
                                {portfolioData.awards.slice(0, 2).map((a, i) => (
                                    <div key={i} className="text-center rounded-xl p-4 cursor-default"
                                        style={{ background: "linear-gradient(135deg, rgba(80,70,229,0.1), rgba(124,58,237,0.06))", border: "1px solid rgba(80,70,229,0.15)" }}>
                                        <Trophy className="h-6 w-6 text-yellow-400 mx-auto mb-2" />
                                        <p className="text-[10px] font-bold text-foreground leading-tight">{a.title}</p>
                                        <p className="text-[9px] text-foreground/40 mt-0.5">{a.year}</p>
                                    </div>
                                ))}
                            </div>

                            <div className="space-y-4">
                                {portfolioData.awards.slice(2).map((award, i) => {
                                    const cfg = getAward(award.title)
                                    const AIcon = cfg.icon
                                    return (
                                        <motion.div
                                            key={i}
                                            whileHover={{ x: 5 }}
                                            transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                            className="flex items-center gap-3 group cursor-default"
                                        >
                                            <div className="h-8 w-8 rounded-lg flex items-center justify-center shrink-0"
                                                style={{ background: `${cfg.color}15` }}>
                                                <AIcon className="h-3.5 w-3.5" style={{ color: cfg.color }} />
                                            </div>
                                            <div>
                                                <p className="text-xs font-semibold text-foreground group-hover:text-primary transition-colors leading-snug">{award.title}</p>
                                                <p className="text-[9px] text-foreground/40">{award.issuer} · {award.year}</p>
                                            </div>
                                        </motion.div>
                                    )
                                })}
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
