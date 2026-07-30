import { useOutsideClick } from "@/shared/hooks/useOutsideClick";
import { CloseIcon } from "@/shared/icons";
import type { MobileSidebarProps } from "../types";
import Logo from "./Logo";
import SidebarLinks from "./SidebarLinks";

export default function MobileSidebar({ isOpen, onClose }: MobileSidebarProps) {
  const asideRef = useOutsideClick<HTMLElement>(onClose);

  if (!isOpen) return null;

  return (
    <div className="md:hidden">
      <div className="dark:bg-black-800/85 bg-white-200/60 fixed inset-0 z-40 backdrop-blur-xs" />

      <aside
        ref={asideRef}
        className="dark:bg-black-700 bg-white-300 fixed inset-y-0 inset-s-0 z-50 w-75 overflow-y-auto shadow-xl"
      >
        <div className="flex h-20 items-center justify-start px-5">
          <button aria-label="Close-icon" title="Close" onClick={onClose}>
            <div className="flex items-center justify-center">
              <CloseIcon />
            </div>
          </button>
        </div>

        <Logo onClose={onClose} />

        <SidebarLinks onNavigate={onClose} />
      </aside>
    </div>
  );
}
