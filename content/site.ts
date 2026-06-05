export type NavLink = {
  label: string;
  href: string;
};

export type NavGroup = {
  label: string;
  items: readonly NavLink[];
};

export type NavItem = NavLink | NavGroup;

export const navItems = [
  { label: "Home", href: "/" },
  {
    label: "About",
    items: [
      { label: "Vision", href: "/about" },
      { label: "Team", href: "/team" },
      { label: "Members", href: "/members" },
      { label: "Contact", href: "/contact" }
    ]
  },
  {
    label: "Resources",
    items: [
      { label: "Current Projects", href: "/current-projects" },
      { label: "Protocol", href: "/protocol" },
      { label: "Public Datasets", href: "/public-datasets" }
    ]
  },
  {
    label: "Updates",
    items: [
      { label: "Upcoming Events", href: "/events" }
    ]
  }
] as const satisfies readonly NavItem[];

export const flatNavItems: readonly NavLink[] = navItems.flatMap((item): NavLink[] =>
  "items" in item ? [...item.items] : [item]
);

export const contact = {
  organization: "International Weed Recognition Consortium",
  shortName: "IWRC",
  email: "muthu.bagavathiannan@tamu.edu",
  sourceUrl: "https://www.weedrecognition.org/"
};

export const focusAreas = [
  "Open weed recognition community building",
  "Sensor-based field image collection",
  "Image classification and annotation protocols",
  "Machine-learning training datasets",
  "Searchable public dataset access",
  "Outreach for weed science and precision control"
];

export const siteProfile = {
  siteName: "IWRC",
  representedEntity: "International Weed Recognition Consortium",
  primaryAudience:
    "Weed scientists, precision agriculture researchers, dataset contributors, computer-vision teams, extension partners, and technology developers working on sensor-based weed recognition.",
  tone:
    "Institutional, research-led, collaborative, practical, and globally oriented, with restrained agricultural imagery and clear resource navigation.",
  mission:
    "Promote sensor-based weed recognition capability for advanced weed research and precision weed control applications.",
  valueProposition:
    "IWRC connects a global research community around shared protocols, public datasets, projects, and events that accelerate reliable weed recognition systems."
};
