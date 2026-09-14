import ErrorBoundary from "@/shared/components/errorBoundary";
import { useLanguage } from "@/shared/hooks/useLanguage";
import { useEffect } from "react";
import Navigation from "../navigation/Navigation";
import QueryProvider from "./QueryProvider";
import RoutesProvider from "./RoutesProvider";
import ThemeProvider from "./ThemeProvider";
import ToastProvider from "./ToastProvider";

export default function AppProvider() {
  const currentLanguage = useLanguage();

  useEffect(() => {
    document.documentElement.lang = currentLanguage;
    document.documentElement.dir = currentLanguage === "ar" ? "rtl" : "ltr";
  }, [currentLanguage]);

  return (
    <QueryProvider>
      <ThemeProvider>
        <ToastProvider />
        <RoutesProvider>
          <ErrorBoundary>
            <Navigation />
          </ErrorBoundary>
        </RoutesProvider>
      </ThemeProvider>
    </QueryProvider>
  );
}
