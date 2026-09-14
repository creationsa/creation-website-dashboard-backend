import TrustedWebsite from "./TrustedWebsite";
import { AllTrustedWebsitesProps } from "./types";

export default function AllTrustedWebsites({ items }: AllTrustedWebsitesProps) {
  return (
    <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
      {items.map((item, index) => (
        <TrustedWebsite key={index} {...item} />
      ))}
    </div>
  );
}
