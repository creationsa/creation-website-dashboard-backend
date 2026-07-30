export const PROJECT_TABS = [
  { key: "all", label: "all" },
  { key: "website", label: "website" },
  { key: "branding", label: "branding" },
  { key: "production", label: "production" },
  { key: "app", label: "app" },
] as const;

export type ProjectTab = (typeof PROJECT_TABS)[number]["key"];
