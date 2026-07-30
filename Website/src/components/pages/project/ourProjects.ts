import moujImg from "../../../../public/images/project/mouj/creation_LLC_projects_1-06.png";

import boulevardWorldImg from "../../../../public/images/project/boulevardWorld/creation_LLC_projects_1-18.png";

import maybachBoutiquetImg from "../../../../public/images/project/maybachBoutique/creation_LLC_projects_1-26.png";

import errvaImg from "../../../../public/images/project/errva/creation_LLC_projects_1-36.png";

import tasierImg from "../../../../public/images/project/tasier/creation_LLC_projects_1-49.png";

import nozomiImg from "../../../../public/images/project/nozomi/creation_LLC_projects_2-10.png";

import cupicImg from "../../../../public/images/project/cupic/creation_LLC_projects_2-20.png";

import phaseImg from "../../../../public/images/project/phase/creation_LLC_projects_2-25.png";

import darfImg from "../../../../public/images/project/darf/creation_LLC_projects_2-40.png";

import bticGroupImg from "../../../../public/images/project/bticGroup/creation_LLC_projects_2-44.png";

import damonsImg from "../../../../public/images/project/damons/creation_LLC_projects_3-17.png";

import shovelImg from "../../../../public/images/project/shovel/creation_LLC_projects_3-10.png";

import { ProjectItem } from "./types";

export const PROJECTS: ProjectItem[] = [
  {
    type: "branding",
    toolkit_header: "branding",
    toolkit_title: "title_1",
    href: "/mouj",
    img: moujImg,
  },
  {
    type: "branding",
    toolkit_header: "branding",
    toolkit_title: "title_2",
    href: "/boulevard-world",
    img: boulevardWorldImg,
  },
  {
    type: "branding",
    toolkit_header: "branding",
    toolkit_title: "title_3",
    href: "/maybach-boutique",
    img: maybachBoutiquetImg,
  },
  {
    type: ["branding", "production"],
    toolkit_header: ["branding", "production"],
    toolkit_title: "title_4",
    href: "/errva",
    img: errvaImg,
  },
  {
    type: ["branding", "app"],
    toolkit_header: ["branding", "app"],
    toolkit_title: "title_5",
    href: "/tasier",
    img: tasierImg,
  },
  {
    type: "production",
    toolkit_header: "production",
    toolkit_title: "title_6",
    href: "/nozomi",
    img: nozomiImg,
  },
  {
    type: "branding",
    toolkit_header: "branding",
    toolkit_title: "title_7",
    href: "/cupic",
    img: cupicImg,
  },
  {
    type: ["branding", "website"],
    toolkit_header: ["branding", "website"],
    toolkit_title: "title_8",
    href: "/phase",
    img: phaseImg,
  },
  {
    type: ["branding", "production"],
    toolkit_header: ["branding", "production"],
    toolkit_title: "title_9",
    href: "/darf",
    img: darfImg,
  },
  {
    type: ["branding", "production"],
    toolkit_header: ["branding", "production"],
    toolkit_title: "title_10",
    href: "/btic-group",
    img: bticGroupImg,
  },
  {
    type: ["branding", "production"],
    toolkit_header: ["branding", "production"],
    toolkit_title: "title_11",
    href: "/damons",
    img: damonsImg,
  },
  {
    type: ["branding", "production"],
    toolkit_header: ["branding", "production"],
    toolkit_title: "title_12",
    href: "/shovel",
    img: shovelImg,
  },
];
