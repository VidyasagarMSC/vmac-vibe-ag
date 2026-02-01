
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Experience } from "@/components/sections/experience";
import { Projects } from "@/components/sections/projects";
import { Articles } from "@/components/sections/articles";
import { Skills } from "@/components/sections/skills";
import { Contact } from "@/components/sections/contact";

export default function Home() {
  return (
    <main className="min-h-screen bg-background relative selection:bg-primary/20 selection:text-primary">
      <Navbar />
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Articles />
      <Skills />
      <Contact />
      <Footer />
    </main>
  );
}
