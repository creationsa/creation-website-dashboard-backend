import type { PagesGridProps } from "../../types";
import PagesCard from "./PagesCard";

export default function PagesGrid({ pages }: PagesGridProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {pages.map((page) => (
        <PagesCard key={page.id} page={page} />
      ))}
    </div>
  );
}
