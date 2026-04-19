export const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { 
    label: "Solutions", 
    href: "#", 
    isDropdown: true,
    subLinks: [
      { 
        label: "Smart Legal Briefcase", 
        href: "/solutions/smart-legal-briefcase",
        description: "Store, scan, and manage all your legal documents in one place."
      },
      { 
        label: "Smart Legal Calendar", 
        href: "/solutions/smart-legal-calendar",
        description: "Track hearings, deadlines, sync schedules, and get alerts."
      },
      { 
        label: "Smart Legal AI Assistant", 
        href: "/solutions/smart-legal-ai-assistant",
        description: "Speak, write, research, and draft legal work instantly."
      },
      { 
        label: "Smart Legal Research Hub", 
        href: "/solutions/smart-legal-research-hub",
        description: "Search across millions of cases, laws, and documents in seconds."
      },
      { 
        label: "Smart Legal Notepad", 
        href: "/solutions/smart-legal-notepad",
        description: "Write, organize, and manage all your legal notes clearly."
      },
      { 
        label: "Smart Legal Translator", 
        href: "/solutions/smart-legal-translator",
        description: "Translate legal documents into multiple languages accurately."
      },
      { 
        label: "Chronology Builder", 
        href: "/solutions/chronology-builder",
        description: "Automatically create a structured timeline of dates and events."
      },
    ],
    featured: {
      title: "The AI Native Workspace",
      description: "Law firms and legal teams use Yugality to build new service models and add value collaboratively.",
      image: "/screenshot.jpg",
      href: "/solutions"
    }
  },
  { label: "Security", href: "/security" },
  { label: "Testimonials", href: "/#testimonials" },
  { label: "Pricing", href: "/pricing" },
  { label: "Blog", href: "/blog" },
];
