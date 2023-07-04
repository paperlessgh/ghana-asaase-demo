export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: "Ghana Asaase",
  description: "A simple land registry system for Ghana using blockchain",
  getLogoUrl: (theme: string | undefined) =>
    theme ? `/gh-map-${theme}.svg` : "/gh-map-dark.svg",
  mainNav: [
    {
      title: "Application",
      href: "/app/lookup-land",
    },
  ],
  links: {
    twitter: "https://twitter.com/shadcn",
    github: "https://github.com/shadcn/ui",
    docs: "https://ui.shadcn.com",
  },
}
