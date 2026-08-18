#!/usr/bin/env python3
"""Fix remaining real estate references in namit.html - section by section."""

with open('namit.html', 'r', encoding='utf-8') as f:
    c = f.read()

# ============================================================
# SECTION 4: Fix remaining "Residences" and "Khodynka Field" references
# ============================================================

# Navbar "Residences" links -> "Projects"
c = c.replace(">Residences</a>", ">Projects</a>")

# Fix Khodynka Field
c = c.replace('Khodynka Field', 'Launch Range')

# "Residences" in project detail buttons
c = c.replace('Residences</span>', 'Projects</span>')

# "As few as 3 residences" -> "As few as 3 techs"
c = c.replace('As few as 3 residences', 'As few as 3 engineers')

# "terrace residences" -> "terrace projects"
c = c.replace('terrace residences', 'terrace projects')

with open('namit.html', 'w', encoding='utf-8') as f:
    f.write(c)
print("Section 4 done")