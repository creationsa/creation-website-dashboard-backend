import { HamburgerIcon } from "@/shared/icons";
import type { ToggleSidebarProps } from "../types";

export default function ToggleSidebar({ toggleSidebar }: ToggleSidebarProps) {
  return (
    <div className="flex items-center justify-center md:hidden">
      <button
        aria-label="Toggle-menu"
        title="Toggle menu"
        className="border-border-800! dark:border-border-900! dark:hover:text-black-100 hover:text-white-100 text-tiffany-600 hover:bg-tiffany-600 dark:text-tiffany-100 dark:hover:bg-tiffany-100 rounded-xl border p-1 transition-colors"
        onClick={toggleSidebar}
      >
        <HamburgerIcon className="size-6 sm:size-8" />
      </button>
    </div>
  );
}
