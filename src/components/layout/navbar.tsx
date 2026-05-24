"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useTheme } from "next-themes"
import { Moon, Sun, Menu, X } from "lucide-react"
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion"
import { cn } from "@/lib/utils"

const NAV = [
    { name: "About", href: "#about" },
    { name: "Experience", href: "#experience" },
    { name: "Projects", href: "#projects" },
    { name: "Articles", href: "#articles" },
    { name: "Research", href: "/articles" },
    { name: "Citations", href: "/citations" },
    { name: "Contact", href: "#contact" },
]

export function Navbar() {
    const { theme, setTheme } = useTheme()
    const [open, setOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    const [mounted, setMounted] = useState(false)

    const { scrollYProgress } = useScroll()
    const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30, restDelta: 0.001 })

    useEffect(() => { setMounted(true) }, [])

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 60)
        window.addEventListener("scroll", onScroll, { passive: true })
        return () => window.removeEventListener("scroll", onScroll)
    }, [])

    const isDark = theme === "dark"

    return (
        <>
            <motion.div
                className="fixed top-0 left-0 right-0 h-[2px] z-[999] origin-left bg-gradient-to-r from-accent via-orange-400 to-accent"
                style={{ scaleX }}
            />

            <header className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
                scrolled ? "bg-background/80 backdrop-blur-lg border-b border-border" : "bg-transparent"
            )}>
                <div className="container-main flex items-center justify-between h-16">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-accent to-orange-600 flex items-center justify-center font-bold text-white text-sm">
                            VM
                        </div>
                        <span className="font-semibold hidden sm:block">Vidyasagar</span>
                        <span className="text-accent text-2xl font-bold">.</span>
                    </Link>

                    <nav className="hidden md:flex items-center gap-1">
                        {NAV.map(({ name, href }) => (
                            <Link
                                key={name}
                                href={href}
                                className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-muted"
                            >
                                {name}
                            </Link>
                        ))}

                        <div className="mx-2 h-5 w-px bg-border" />

                        {mounted && (
                            <button
                                onClick={() => setTheme(isDark ? "light" : "dark")}
                                className="p-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
                            >
                                {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                            </button>
                        )}
                    </nav>

                    <div className="flex items-center gap-2 md:hidden">
                        {mounted && (
                            <button
                                onClick={() => setTheme(isDark ? "light" : "dark")}
                                className="p-2 rounded-lg bg-muted"
                            >
                                {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                            </button>
                        )}
                        <button
                            onClick={() => setOpen(!open)}
                            className="p-2 rounded-lg bg-muted"
                        >
                            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </button>
                    </div>
                </div>

                <AnimatePresence>
                    {open && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="md:hidden bg-background border-t border-border"
                        >
                            <nav className="flex flex-col p-4 gap-2">
                                {NAV.map(({ name, href }) => (
                                    <Link
                                        key={name}
                                        href={href}
                                        onClick={() => setOpen(false)}
                                        className="px-4 py-3 text-sm font-medium rounded-lg hover:bg-muted transition-colors"
                                    >
                                        {name}
                                    </Link>
                                ))}
                            </nav>
                        </motion.div>
                    )}
                </AnimatePresence>
            </header>
        </>
    )
}