import re

with open("src/app/globals.css", "r") as f:
    css = f.read()

# Enhance Light mode colors to be punchier
css = re.sub(r'(--background: hsl\(220 28% 97%\);)', r'--background: hsl(220 35% 96%);', css)
css = re.sub(r'(--card: rgba\(255, 255, 255, 0.62\);)', r'--card: rgba(255, 255, 255, 0.45);', css)

# Enhance Dark mode colors to be deeper 
css = re.sub(r'(--background: hsl\(222 30% 5.5%\);)', r'--background: hsl(225 35% 4%);', css)
css = re.sub(r'(--card: rgba\(22, 26, 44, 0.72\);)', r'--card: rgba(18, 20, 28, 0.45);', css)

# Update glass-card styling
glass_card = """/* Glass card — primary surface for sections */
.glass-card {
  position: relative;
  background: rgba(255, 255, 255, 0.45);
  backdrop-filter: blur(40px) saturate(220%);
  -webkit-backdrop-filter: blur(40px) saturate(220%);
  border: 1px solid rgba(255, 255, 255, 0.85);
  box-shadow:
    0 16px 40px rgba(0, 0, 0, 0.05),
    0 1px 0 rgba(255, 255, 255, 1) inset,
    0 -1px 0 rgba(0, 0, 0, 0.02) inset;
  border-radius: 1.75rem;
  transition: transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.4s ease;
}

.dark .glass-card {
  background: rgba(18, 22, 34, 0.35);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow:
    0 24px 60px rgba(0, 0, 0, 0.6),
    0 1px 0 rgba(255, 255, 255, 0.1) inset,
    0 0 0 1px rgba(var(--primary-rgb), 0.05) inset;
}"""

css = re.sub(r'/\* Glass card — primary surface for sections \*/.*?(?=/\* Glass panel — used inside cards \*/)', glass_card + "\n\n", css, flags=re.DOTALL)

# Add bento grid classes at the end
bento_css = """
/* ======= BENTO GRID ======= */
.bento-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.25rem;
}

@media (max-width: 1024px) {
  .bento-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .bento-grid {
    grid-template-columns: 1fr;
  }
}

.bento-item-large { grid-column: span 2; grid-row: span 2; }
.bento-item-wide { grid-column: span 2; grid-row: span 1; }
.bento-item-tall { grid-column: span 1; grid-row: span 2; }
.bento-item { grid-column: span 1; grid-row: span 1; }

.bento-hover {
  transition: transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1), border-color 0.4s ease, box-shadow 0.4s ease;
}

.bento-hover:hover {
  transform: translateY(-6px);
  border-color: rgba(var(--primary-rgb), 0.3);
}

.dark .bento-hover:hover {
  border-color: rgba(var(--primary-rgb), 0.4);
}
"""

css += bento_css

with open("src/app/globals.css", "w") as f:
    f.write(css)

print("CSS updated successfully")
