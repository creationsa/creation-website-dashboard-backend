import moujImg from "../../../../../public/images/project/mouj/creation_LLC_projects_1-06.png";

import maybachBoutiquetImg from "../../../../../public/images/project/maybachBoutique/creation_LLC_projects_1-26.png";

import boulevardWorldImg from "../../../../../public/images/project/boulevardWorld/creation_LLC_projects_1-18.png";

import cupicImg from "../../../../../public/images/project/cupic/creation_LLC_projects_2-20.png";

import maybachBoutiqueImg from "../../../../../public/images/project/maybachBoutique/creation_LLC_projects_1-24.png";

import darfImg from "../../../../../public/images/project/darf/creation_LLC_projects_2-40.png";

import errvaImg from "../../../../../public/images/project/errva/creation_LLC_projects_1-36.png";

import tasierImg from "../../../../../public/images/project/tasier/creation_LLC_projects_1-49.png";

export const OUR_SOLUTIONS = [
  {
    title: "branding",
    description: "branding_desc",
    link: "/solutions/branding",
    projects: [
      { slug: "mouj", translationKey: "mouj", firstImage: moujImg },
      {
        slug: "maybach-boutique",
        translationKey: "maybach_boutique",
        firstImage: maybachBoutiquetImg,
      },
    ],
  },
  {
    title: "digital_marketing",
    description: "digital_marketing_desc",
    link: "/solutions/digital-marketing",
    projects: [
      {
        slug: "boulevard-world",
        translationKey: "boulevard_world",
        firstImage: boulevardWorldImg,
      },
      { slug: "cupic", translationKey: "cupic", firstImage: cupicImg },
    ],
  },
  {
    title: "web_design",
    description: "web_design_desc",
    link: "/solutions/web-design",
    projects: [
      { slug: "darf", translationKey: "darf", firstImage: darfImg },
      {
        slug: "maybach-boutique",
        translationKey: "maybach_boutique",
        firstImage: maybachBoutiqueImg,
      },
    ],
  },
  {
    title: "production",
    description: "production_desc",
    link: "/solutions/production",
    projects: [
      { slug: "errva", translationKey: "errva", firstImage: errvaImg },
      { slug: "tasier", translationKey: "tasier", firstImage: tasierImg },
    ],
  },
] as const;
