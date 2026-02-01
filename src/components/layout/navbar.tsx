
"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { useTheme } from "next-themes"
import { Moon, Sun, Menu, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

const navItems = [
    { name: "About", href: "#about" },
    { name: "Experience", href: "#experience" },
    { name: "Projects", href: "#projects" },
    { name: "Articles", href: "#articles" },
    { name: "Skills", href: "#skills" },
    { name: "Contact", href: "#contact" },
]

export function Navbar() {
    const { theme, setTheme } = useTheme()
    const [isOpen, setIsOpen] = React.useState(false)
    const [scrolled, setScrolled] = React.useState(false)

    React.useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50)
        }
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    return (
        <header
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
                scrolled ? "bg-background/80 backdrop-blur-md border-b border-border shadow-sm" : "bg-transparent"
            )}
        >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <Link href="/" className="text-xl font-bold font-heading tracking-tight flex items-center gap-2">
                        <Image
                            src="/logo.svg"
                            alt="VM Logo"
                            width={32}
                            height={32}
                            className="rounded-lg"
                        />
                        <span className="hidden sm:inline">Vidyasagar</span>
                        <span className="text-primary text-2xl leading-none">.</span>
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-8">
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors font-mono"
                            >
                                {item.name}
                            </Link>
                        ))}
                        <button
                            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                            className="p-2 rounded-full hover:bg-muted transition-colors relative h-9 w-9 flex items-center justify-center border border-transparent hover:border-border"
                            aria-label="Toggle theme"
                        >
                            <Sun className="h-5 w-5 transition-all scale-100 rotate-0 dark:scale-0 dark:-rotate-90 text-yellow-600 dark:text-transparent absolute" />
                            <Moon className="h-5 w-5 transition-all scale-0 rotate-90 dark:scale-100 dark:rotate-0 dark:text-blue-400 absolute" />
                        </button>
                    </nav>

                    {/* Mobile Menu Button */}
                    <div className="flex items-center gap-4 md:hidden">
                        <button
                            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                            className="p-2 rounded-full hover:bg-muted transition-colors relative h-9 w-9 flex items-center justify-center border border-transparent hover:border-border"
                        >
                            <Sun className="h-5 w-5 transition-all scale-100 rotate-0 dark:scale-0 dark:-rotate-90 text-yellow-600 dark:text-transparent absolute" />
                            <Moon className="h-5 w-5 transition-all scale-0 rotate-90 dark:scale-100 dark:rotate-0 dark:text-blue-400 absolute" />
                        </button>
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="p-2 rounded-md hover:bg-muted transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
                        >
                            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Nav */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-background border-b border-border"
                    >
                        <nav className="flex flex-col p-4 space-y-4">
                            {navItems.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    onClick={() => setIsOpen(false)}
                                    className="text-base font-medium text-foreground hover:text-primary transition-colors font-mono py-2 min-h-[44px] flex items-center"
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    )
}
