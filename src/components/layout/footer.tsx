
import { portfolioData } from "@/data/portfolio"

export function Footer() {
    return (
        <footer className="bg-background border-t border-border py-12">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="text-center md:text-left">
                    <p className="text-sm text-muted-foreground">
                        &copy; {new Date().getFullYear()} {portfolioData.personal.name}. All rights reserved.
                    </p>
                </div>
                <div className="flex items-center gap-6">
                    <p className="text-sm text-muted-foreground">
                        Built with Next.js & Tailwind
                    </p>
                </div>
            </div>
        </footer>
    )
}
