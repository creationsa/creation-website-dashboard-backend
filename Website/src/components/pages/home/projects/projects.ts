import darfImg from "../../../../../public/images/project/darf/creation_LLC_projects_2-33.png";
import bticGroupImg from "../../../../../public/images/project/bticGroup/creation_LLC_projects_2-47.png";
import phaseImg from "../../../../../public/images/project/phase/creation_LLC_projects_2-21.png";
import maybachBoutiqueImg from "../../../../../public/images/project/maybachBoutique/creation_LLC_projects_1-25.png";
import nozomiImg from "../../../../../public/images/project/nozomi/creation_LLC_projects_2-10.png";
import cupicImg from "../../../../../public/images/project/cupic/creation_LLC_projects_2-16.png";
import damonsImg from "../../../../../public/images/project/damons/creation_LLC_projects_3-17.png";
import shovelImg from "../../../../../public/images/project/shovel/creation_LLC_projects_3-10.png";

import { ProjectData } from "./types";

export const PROJECTS: ProjectData[] = [
  {
    image: darfImg,
    transitionKey: "darf",
    href: "darf",
  },
  {
    image: damonsImg,
    transitionKey: "damons",
    href: "damons",
  },
  {
    image: shovelImg,
    transitionKey: "shovel",
    href: "shovel",
  },
  {
    image: bticGroupImg,
    transitionKey: "btic_group",
    href: "btic-group",
  },
  {
    image: phaseImg,
    transitionKey: "phase",
    href: "phase",
  },
  {
    image: maybachBoutiqueImg,
    transitionKey: "maybach_boutique",
    href: "maybach-boutique",
  },
  {
    image: nozomiImg,
    transitionKey: "nozomi",
    href: "nozomi",
  },
  {
    image: cupicImg,
    transitionKey: "cupic",
    href: "cupic",
  },
];
