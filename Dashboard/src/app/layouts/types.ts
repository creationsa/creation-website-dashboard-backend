import { type ComponentType } from "react";

// LOGO
export interface LogoProps {
  onClose?: () => void;
}

// ------------------------------------------------------------------------ //

// TOGGLE SIDEBAR
export interface ToggleSidebarProps {
  toggleSidebar: () => void;
}

// ------------------------------------------------------------------------ //
// SIDEBAR MENU

export interface SidebarSubmenuItem {
  href: string;
  title: string;
}

export interface SidebarLink {
  href: string;
  title: string;
  icon: ComponentType<{ className?: string }>;
  activePrefix?: string;
  submenuItems?: SidebarSubmenuItem[];
}

export interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface SidebarLinksProps {
  onNavigate?: () => void;
}
