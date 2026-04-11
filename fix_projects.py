import re

with open("src/components/sections/projects.tsx", "r") as f:
    content = f.read()

# Replace grid wrapper
content = re.sub(
    r'<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">',
    r'<div className="bento-grid">',
    content
)

# Update ProjectCard function to include bento sizing
bento_logic = """function ProjectCard({ project, index }: { project: typeof portfolioData.projects[0]; index: number }) {
    const tilt = useTilt({ max: 12, perspective: 900, scale: 1.03 })
    const primaryColor = getColor(project.techStack[0])
    const stars = STARS[project.title] || 20
    const forks = project.techStack.length + 4
    
    let bentoClass = "bento-item";
    if (index === 0) bentoClass = "bento-item-large";
    else if (index === 1 || index === 2) bentoClass = "bento-item-wide";
    else if (index === 3) bentoClass = "bento-item-tall";
    else if (index === 4) bentoClass = "bento-item-wide";
    else bentoClass = "bento-item";"""

content = re.sub(
    r'function ProjectCard\(\{.*?\}\) \{.*?const forks =.*?\+ 4',
    bento_logic,
    content,
    flags=re.DOTALL
)

# Replace className in motion.div
content = re.sub(
    r'className="perspective-800 h-full"',
    r'className={`perspective-800 h-full ${bentoClass}`}',
    content
)

# Also add .bento-hover class to the inner tilt container
content = re.sub(
    r'className="group glass-card overflow-hidden h-full flex flex-col cursor-pointer depth-shadow relative"',
    r'className="group glass-card overflow-hidden h-full flex flex-col cursor-pointer depth-shadow relative bento-hover"',
    content
)

with open("src/components/sections/projects.tsx", "w") as f:
    f.write(content)

print("Projects updated nicely")
