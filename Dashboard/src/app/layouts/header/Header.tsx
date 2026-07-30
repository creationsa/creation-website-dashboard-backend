import LogoutButton from "@/features/auth/components/LogoutButton";
import ProfileAvatar from "@/features/auth/components/ProfileAvatar";
import ThemeToggle from "@/shared/ui/ThemeToggle";
import TranslateButton from "@/shared/ui/TranslateButton";
import { useState } from "react";
import MobileSidebar from "../sidebar/MobileSidebar";
import ToggleSidebar from "../sidebar/ToggleSidebar";

export default function Header() {
  const [showSidebar, setShowSidebar] = useState(false);
  const toggleSidebar = () => setShowSidebar((prev) => !prev);
  const closeSidebar = () => setShowSidebar(false);

  return (
    <>
      <header className="dark:bg-black-700 bg-white-300 flex h-17.5 items-center justify-between px-5">
        <div className="flex items-center gap-1 sm:gap-2">
          <ToggleSidebar toggleSidebar={toggleSidebar} />

          <TranslateButton />

          <ThemeToggle />
        </div>
        <div className="flex items-center gap-1 sm:gap-2">
          <ProfileAvatar />

          <LogoutButton />
        </div>
      </header>

      <MobileSidebar isOpen={showSidebar} onClose={closeSidebar} />
    </>
  );
}
