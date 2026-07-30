import Image from "next/image";
import clutchImg from "../../.././../public/images/layout/clutch-creation.svg";
import sortlistImg from "../../.././../public/images/layout/sortlist-creation.svg";
import { TrustedPartnersProps } from "./types";

export default function TrustedPartners({ footer }: TrustedPartnersProps) {
  return (
    <div className="flex gap-3">
      <a href="https://www.sortlist.com/agency/creation-63" target="_blank">
        <span className="mb-2 block text-xs uppercase sm:text-base">
          {footer.sortlist}
        </span>
        <div className="w-[50%]">
          <Image
            src={sortlistImg}
            alt={footer.sortlist}
            className="object-cover"
          />
        </div>
      </a>
      <a href="https://clutch.co/profile/cr-ation" target="_blank">
        <span className="mb-2 block text-xs uppercase sm:text-base">
          {footer.clutch}
        </span>
        <div className="w-[50%]">
          <Image src={clutchImg} alt={footer.clutch} className="object-cover" />
        </div>
      </a>
    </div>
  );
}
