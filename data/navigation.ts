export const primaryNav = [
  { label: "Finishes", href: "/finishes" },
  { label: "Projects", href: "/projects" },
  { label: "Applications", href: "/applications" },
  { label: "Process", href: "/process" },
  { label: "About", href: "/about" },
  { label: "Resources", href: "/resources" },
] as const;

export const finishesMegaMenu = {
  byCategory: [
    { label: "Concrete Effects", param: "category", value: "Concrete" },
    { label: "Stone Effects", param: "category", value: "Stone" },
    { label: "Metallic Effects", param: "category", value: "Metallic" },
    { label: "Mineral Plasters", param: "category", value: "Mineral" },
    { label: "Decorative Effects", param: "category", value: "Decorative" },
    { label: "Flooring", param: "category", value: "Flooring" },
  ],
  byStyle: [
    { label: "Industrial", param: "style", value: "Industrial" },
    { label: "Luxury", param: "style", value: "Luxury" },
    { label: "Natural", param: "style", value: "Natural" },
    { label: "Contemporary", param: "style", value: "Contemporary" },
    { label: "Artistic", param: "style", value: "Artistic" },
    { label: "Minimal", param: "style", value: "Minimal" },
  ],
  byApplication: [
    { label: "Residential", param: "application", value: "Residential" },
    { label: "Hospitality", param: "application", value: "Hospitality" },
    { label: "Commercial", param: "application", value: "Commercial" },
    { label: "Retail", param: "application", value: "Retail" },
    { label: "Office", param: "application", value: "Office" },
    { label: "Exterior", param: "application", value: "Exterior" },
  ],
};

export const footerNav = {
  finishes: [
    { label: "All Finishes", href: "/finishes" },
    { label: "Concrete Effects", href: "/finishes?category=Concrete" },
    { label: "Stone Effects", href: "/finishes?category=Stone" },
    { label: "Metallic Effects", href: "/finishes?category=Metallic" },
    { label: "Bespoke Finishes", href: "/bespoke" },
  ],
  projects: [
    { label: "All Projects", href: "/projects" },
    { label: "Residential", href: "/projects?type=Residential" },
    { label: "Hospitality", href: "/projects?type=Hospitality" },
    { label: "Commercial", href: "/projects?type=Commercial" },
    { label: "Retail", href: "/projects?type=Retail" },
  ],
  company: [
    { label: "About", href: "/about" },
    { label: "Process", href: "/process" },
    { label: "Cameleo, Poland", href: "/cameleo" },
    { label: "Contact", href: "/contact" },
  ],
  resources: [
    { label: "Technical Resources", href: "/resources" },
    { label: "Downloads", href: "/resources" },
    { label: "Journal", href: "/journal" },
    { label: "Inspiration", href: "/inspiration" },
  ],
};
