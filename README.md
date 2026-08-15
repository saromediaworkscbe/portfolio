# FRAME&FIELD — Media Portfolio (single page)

A one-page cinematic portfolio. All content — Home, Projects, About, Skills, Contact —
lives on a single scrolling page with anchor navigation.

| Purpose            | Library              |
| ------------------ | -------------------- |
| 3D Scene           | Three.js             |
| React Integration  | React Three Fiber    |
| Extra Effects      | Drei                 |
| Scroll Animation   | GSAP + ScrollTrigger |
| Page Animations    | Framer Motion        |
| Styling            | Tailwind CSS         |

## Getting started

```bash
npm install
npm run dev
```

## Add your background video

```
public/videos/reel.mp4          # required — hero background
public/videos/reel-poster.jpg   # optional — shown while video loads
```

H.264 mp4, 1080p, 10–25 s loop, under ~8 MB. Muted for autoplay.

## Folder structure

```
media-portfolio/
├── index.html
├── package.json
├── vite.config.js              # "@" alias → src/
├── tailwind.config.js          # color tokens, fonts
├── postcss.config.js
├── public/
│   ├── favicon.svg
│   └── videos/                 # reel.mp4 goes here
└── src/
    ├── main.jsx                # React root (no router — single page)
    ├── App.jsx                 # stacks all sections in order
    ├── index.css               # Tailwind + fonts + design tokens
    ├── components/
    │   ├── layout/
    │   │   ├── Navbar.jsx          # anchor nav; ScrollTrigger highlights active section
    │   │   └── Footer.jsx
    │   ├── three/
    │   │   ├── HeroScene.jsx       # R3F + Drei glass lens elements over the video
    │   │   └── SkillsScene.jsx     # rotating wireframe icosahedron
    │   └── ui/
    │       ├── SectionHeading.jsx
    │       ├── TimecodeTicker.jsx  # live HH:MM:SS:FF counter
    │       └── ProjectCard.jsx
    ├── sections/               # one file per page section
    │   ├── Hero.jsx            # #home — video bg + GSAP intro + 3D layer
    │   ├── Projects.jsx        # #projects — ScrollTrigger card reveals
    │   ├── About.jsx           # #about — career as an edit timeline
    │   ├── Skills.jsx          # #skills — filterable KIT LIST with exposure meters
    │   └── Contact.jsx         # #contact — form (wire handleSubmit to your backend)
    ├── hooks/
    │   └── useGsapReveal.js    # reusable ScrollTrigger reveal (auto-cleanup)
    ├── data/
    │   ├── projects.js         # ← edit: your work
    │   └── skills.js           # ← edit: your kit (dept, level /10, note)
    └── lib/
        └── constants.js        # ← edit: name, tagline, email, section anchors
```

## Skills section design

Skills are presented as a **KIT LIST** — a grid of flight-case cards:

- Department filter buttons (ALL / CAM / POST / 3D-WEB) with Framer Motion
  layout animation when cards enter/leave.
- Each card shows an **exposure-meter readout**: 10 segments that pop up in
  sequence (GSAP `back.out` stagger) when scrolled into view; the last lit
  segment glows amber.
- The Three.js wireframe scene sits inside the grid as one more "piece of gear".

## Notes

- The Three.js hero layer is desktop-only (`hidden md:block`) to keep mobile fast.
- ScrollTriggers are created via `useGSAP` and cleaned up automatically.
- `prefers-reduced-motion` is respected globally in `index.css`.
