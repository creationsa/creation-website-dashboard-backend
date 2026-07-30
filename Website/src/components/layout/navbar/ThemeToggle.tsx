"use client";

import { MoonIcon } from "@/icons";
import SunIcon from "@/icons/SunIcon";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  if (!mounted) return <div className="size-8" aria-hidden="true" />;

  return (
    <button
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      aria-label="Toggle Theme"
      className="text-xl sm:text-2xl md:text-3xl"
    >
      {resolvedTheme === "dark" ? (
        <SunIcon className="text-white-100 size-8" />
      ) : (
        <MoonIcon className="text-black-100 size-8" />
      )}
    </button>
  );
}
