/**
 * English dictionary — the source of truth for the UI string shape.
 * The Arabic dictionary must mirror it exactly (enforced by TypeScript).
 */
export const en = {
  nav: {
    home: "Home",
    about: "About",
    projects: "Projects",
    skills: "Skills",
    contact: "Contact",
    switch: "العربية",
    switchAria: "Switch language to Arabic",
    menu: "Menu",
    close: "Close",
  },

  intro: {
    loading: "Entering the majlis",
    presents: "A 3D portfolio · Riyadh × Yemen",
    skip: "Skip intro",
    enter: "Enter",
  },

  hero: {
    eyebrow: "Web developer & graphic designer",
    title1: "Welcome to my",
    titleAccent: "Yemeni majlis.",
    sub: "A room from Yemen, a laptop from the future. Scroll to look around, or click on the things in the room.",
    cta: "Look around",
    cv: "Download CV",
    hint: "Scroll · drag · click",
  },

  room: {
    laptop: "Laptop — my projects",
    frame: "The frame — about me",
    shelf: "The shelf — skills & tools",
    phone: "The phone — let's talk",
    qamariya: "Qamariya window",
    open: "Open",
  },

  tour: [
    {
      kicker: "01 · The majlis",
      title: "Sit down. Have coffee.",
      body: "Cushions along the wall, a brass dallah on the tray, and sunlight through the colored glass of the qamariya. This is where I think and build.",
      cta: "Who I am",
    },
    {
      kicker: "02 · The laptop",
      title: "Real products, shipped.",
      body: "Point-of-sale systems, business platforms, mobile apps, bots, and open-source libraries — built end to end for real clients.",
      cta: "See the projects",
    },
    {
      kicker: "03 · The frame",
      title: "Designer first, then engineer.",
      body: "I started in graphic design — Photoshop, Illustrator, After Effects — then moved into code. Both still shape how I build.",
      cta: "Read my story",
    },
    {
      kicker: "04 · The shelf",
      title: "The tools on the shelf.",
      body: "Next.js, TypeScript, Flutter, PHP, MySQL on one side. Adobe on the other. Both get used every week.",
      cta: "Skills & tools",
    },
    {
      kicker: "05 · The phone",
      title: "Got an idea? Call the majlis.",
      body: "WhatsApp, email, GitHub, Instagram — pick whichever is closest to you. I usually answer within a day or two.",
      cta: "Get in touch",
    },
    {
      kicker: "06 · The desk",
      title: "Where the code gets written.",
      body: "A real desk in the corner of the majlis: monitor, keyboard, a modern laptop and a lamp for the late nights. Tradition on the floor, technology on the desk.",
      cta: "See what I build here",
    },
  ],

  about: {
    title: "About me",
    statement: "Real products. Real users. Real problems solved.",
    intro:
      "I am Younis Dany — a web developer and graphic designer based in Riyadh, originally from Yemen. My work sits where a real business problem becomes a working piece of software — something people actually use.",
    resume: "Résumé",
    experience: "Work experience",
    education: "Education",
    courses: "Courses & certificates",
    languages: "Languages",
    programming: "Programming & technologies",
    design: "Design software",
    location: "Location",
    availability: "Availability",
    download: "Download CV (PDF)",
    photoAlt: "Portrait of Younis Dany",
  },

  projects: {
    title: "Projects",
    subtitle: "Everything I have built that is public — products, business systems, libraries, and experiments.",
    all: "All",
    repo: "Source",
    live: "Live",
    npm: "npm",
    featured: "Featured",
    count: (n: number) => (n === 1 ? "1 project" : `${n} projects`),
    categories: {
      "web-apps": "Web apps",
      "mobile-apps": "Mobile apps",
      saas: "SaaS",
      "business-systems": "Business systems",
      "ai-automation": "AI & automation",
      "developer-tools": "Developer tools",
      bots: "Bots",
      "open-source": "Open source",
    } as Record<string, string>,
    status: {
      active: "Active",
      "in-progress": "In progress",
      prototype: "Prototype",
      complete: "Complete",
      published: "Published",
      archived: "Archived",
    } as Record<string, string>,
  },

  skills: {
    title: "Skills & tools",
    subtitle: "What I actually use to take an idea to a working product — code on one shelf, design on the other.",
    codeShelf: "Code shelf",
    designShelf: "Design shelf",
    principles: "How I work",
  },

  contact: {
    title: "Let's talk",
    subtitle: "The fastest way to reach me for work, collaboration, or a technical chat.",
    whatsapp: "WhatsApp",
    email: "Email",
    github: "GitHub",
    instagram: "Instagram",
    note: "I usually reply within a day or two. A short line about your project helps me answer faster.",
    location: "Riyadh, Saudi Arabia",
  },

  footer: {
    tagline: "Web developer & graphic designer",
    rights: "All rights reserved.",
    built: "Built with Three.js, React, and a lot of coffee.",
  },

  a11y: {
    stage: "3D Yemeni majlis scene",
    skip: "Skip to content",
  },
};

export type Dictionary = typeof en;
export type Locale = "en" | "ar";
