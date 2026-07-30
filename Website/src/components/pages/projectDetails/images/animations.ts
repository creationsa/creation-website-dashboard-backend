import { Variants } from "framer-motion";

export const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: -40,
    scale: 0.95,
    filter: "blur(10px)",
  },
  show: (index: number = 0) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.7,
      delay: index * 0.12,
      ease: [0.25, 0.1, 0.25, 1],
    },
  }),
};
