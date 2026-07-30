import { StaticImageData } from "next/image";
import team01 from "../../../../public/images/project/darf/creation_LLC_projects_2-36.png";
import team02 from "../../../../public/images/project/darf/creation_LLC_projects_2-33.png";
import team03 from "../../../../public/images/project/darf/creation_LLC_projects_2-34.png";
import team04 from "../../../../public/images/project/darf/creation_LLC_projects_2-35.png";
import team05 from "../../../../public/images/project/darf/creation_LLC_projects_2-37.png";
import { SlideData } from "./types";

export const TEAM_MEMBERS: SlideData[] = [
  {
    image: team01 as StaticImageData,
    title: "Gohendra Maris",
    description: "Branding Designer",
  },
  {
    image: team02 as StaticImageData,
    title: "Gohendra Maris",
    description: "Branding Designer",
  },
  {
    image: team03 as StaticImageData,
    title: "Gohendra Maris",
    description: "Founder & CO",
  },
  {
    image: team04 as StaticImageData,
    title: "Alexzender Loriss",
    description: "UI/UX Designer",
  },
  {
    image: team05 as StaticImageData,
    title: "Edumard Maris",
    description: "Fashion Designer",
  },
];
