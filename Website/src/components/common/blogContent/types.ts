import { ReactNode } from "react";

export interface BlogContentProps {
  title: string;
  children: ReactNode;
  className?: string;
}
