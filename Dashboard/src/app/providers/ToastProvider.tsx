import { useTheme } from "@/shared/hooks/useTheme";
import { Toaster } from "react-hot-toast";

export default function ToastProvider() {
  const { theme } = useTheme();

  const isDark = theme === "dark";

  return (
    <Toaster
      position="top-center"
      reverseOrder={false}
      gutter={8}
      toastOptions={{
        duration: 4000,
        style: {
          background: isDark ? "var(--black-600)" : "var(--white-400)",
          color: isDark ? "var(--white-100)" : "var(--black-100)",
          border: isDark
            ? "1px solid var(--black-600)"
            : "1px solid var(--white-400)",
          borderRadius: "12px",
          padding: "16px",
          fontSize: "14px",
        },

        success: {
          iconTheme: {
            primary: isDark ? "var(--tiffany-100)" : "var(--tiffany-600)",
            secondary: isDark ? "var(--black-100)" : "var(--white-100)",
          },
        },

        error: {
          iconTheme: {
            primary: isDark ? "var(--color-red-700)" : "var(--color-red-600)",
            secondary: isDark ? "var(--white-100)" : "var(--white-100)",
          },
        },
      }}
    />
  );
}
