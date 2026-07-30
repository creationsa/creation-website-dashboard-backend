import TrustedWebsite from "./TrustedWebsite";
import { AllTrustedWebsitesProps } from "./types";
import clutchImg from "../../.././../../public/images/home/XSClutch-creation.svg";
import sortlistImg from "../../.././../../public/images/home/XSsortlist-creation.svg";

export default function AllTrustedWebsites({
  reviews,
}: AllTrustedWebsitesProps) {
  return (
    <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
      <TrustedWebsite
        title={reviews.clutch_title}
        description={reviews.clutch_description}
        link="https://clutch.co/profile/cr-ation"
        img={clutchImg}
        reviews={reviews}
      />
      <TrustedWebsite
        title={reviews.sortlist_title}
        description={reviews.sortlist_description}
        link="https://www.sortlist.com/agency/creation-63"
        img={sortlistImg}
        reviews={reviews}
      />
    </div>
  );
}
