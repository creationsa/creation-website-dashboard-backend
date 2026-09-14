import Logo from "./Logo";
import SidebarLinks from "./SidebarLinks";

export default function Sidebar() {
  return (
    <aside className="dark:bg-black-700 bg-white-300 hide-scrollbar hidden max-h-screen w-75 overflow-y-auto md:block">
      <Logo />
      <SidebarLinks />
    </aside>
  );
}
