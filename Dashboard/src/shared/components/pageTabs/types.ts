export interface PageTabsProps {
  activeTab: "content" | "seo";
  isEditMode?: boolean;
  onChange: (tab: "content" | "seo") => void;
}
