import Image from "next/image";
import { TrustedPartnersProps } from "./types";

export default function TrustedPartners({ badges = [] }: TrustedPartnersProps) {
  return (
    <div className="flex justify-between gap-3">
      {badges.map(({ link, label, image }) => (
        <a key={link} href={link} target="_blank">
          <span className="mb-2 block text-xs uppercase sm:text-base">
            {label}
          </span>
          <div className="w-[50%]">
            <Image
              src={image}
              alt={label}
              width={0}
              height={0}
              sizes="100vw"
              className="h-auto w-full"
              unoptimized
            />
          </div>
        </a>
      ))}
    </div>
  );
}
