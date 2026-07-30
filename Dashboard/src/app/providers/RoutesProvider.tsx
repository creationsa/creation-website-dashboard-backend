import { HashRouter } from "react-router-dom";
import type { ReactNode } from "react";

interface RoutesProviderProps {
  children: ReactNode;
}

export default function RoutesProvider({ children }: RoutesProviderProps) {
  return <HashRouter>{children}</HashRouter>;
}
