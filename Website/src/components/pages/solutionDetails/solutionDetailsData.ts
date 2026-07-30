import branding05 from "../../../../public/images/project/bticGroup/creation_LLC_projects_2-42.png";
import branding02 from "../../../../public/images/project/errva/creation_LLC_projects_1-37.png";
import branding01 from "../../../../public/images/project/mouj/creation_LLC_projects_1-07.png";
import branding04 from "../../../../public/images/project/phase/creation_LLC_projects_2-25.png";
import branding03 from "../../../../public/images/project/tasier/creation_LLC_projects_1-49.png";
import { SolutionDetailsItem } from "./types";

import digitalMarketing04 from "../../../../public/images/project/cupic/creation_LLC_projects_2-16.png";
import digitalMarketing05 from "../../../../public/images/project/darf/creation_LLC_projects_2-33.png";
import digitalMarketing02 from "../../../../public/images/project/errva/creation_LLC_projects_1-39.png";
import digitalMarketing01 from "../../../../public/images/project/maybachBoutique/creation_LLC_projects_1-24.png";
import digitalMarketing03 from "../../../../public/images/project/tasier/creation_LLC_projects_1-41.png";

import webDesign04 from "../../../../public/images/project/bticGroup/creation_LLC_projects_2-47.png";
import webDesign01 from "../../../../public/images/project/darf/creation_LLC_projects_2-36.png";
import webDesign05 from "../../../../public/images/project/darf/creation_LLC_projects_2-40.png";
import webDesign03 from "../../../../public/images/project/maybachBoutique/creation_LLC_projects_1-27.png";
import webDesign02 from "../../../../public/images/project/tasier/creation_LLC_projects_1-45.png";

import production05 from "../../../../public/images/project/bticGroup/creation_LLC_projects_2-42.png";
import production01 from "../../../../public/images/project/bticGroup/creation_LLC_projects_2-46.png";
import production04 from "../../../../public/images/project/errva/creation_LLC_projects_1-33.png";
import production02 from "../../../../public/images/project/phase/creation_LLC_projects_2-25.png";
import production03 from "../../../../public/images/project/tasier/creation_LLC_projects_1-49.png";

export const SOLUTION_DETAILS: SolutionDetailsItem[] = [
  {
    slug: "branding",
    translationKey: "branding_advertising",
    images: [branding01, branding02, branding03, branding04, branding05],
  },
  {
    slug: "digital-marketing",
    translationKey: "digital_marketing",
    images: [
      digitalMarketing01,
      digitalMarketing02,
      digitalMarketing03,
      digitalMarketing04,
      digitalMarketing05,
    ],
  },
  {
    slug: "web-design",
    translationKey: "web_design",
    images: [webDesign01, webDesign02, webDesign03, webDesign04, webDesign05],
  },
  {
    slug: "production",
    translationKey: "production_services",
    images: [
      production01,
      production02,
      production03,
      production04,
      production05,
    ],
  },
];
