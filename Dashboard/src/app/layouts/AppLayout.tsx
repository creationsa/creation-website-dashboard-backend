import { Outlet } from "react-router-dom";
import Header from "./header/Header";
import Sidebar from "./sidebar/Sidebar";

export default function AppLayout() {
  return (
    <div className="dark:text-white-100 text-black-100">
      <div className="flex">
        <Sidebar />
        <div className="w-full md:w-[calc(100%-300px)]">
          <Header />
          <main className="bg-white-200 dark:bg-black-800 flex h-[calc(100vh-70px)] w-full flex-col gap-6 overflow-x-hidden overflow-y-auto px-2 py-4 lg:gap-10 lg:p-5">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
