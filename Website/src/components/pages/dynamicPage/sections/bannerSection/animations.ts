import { Variants } from "framer-motion";

export const createImageReveal = (isRTL: boolean): Variants => ({
  hidden: {
    clipPath: isRTL ? "inset(0 0 0 100%)" : "inset(0 100% 0 0)",
  },
  show: {
    clipPath: "inset(0 0 0 0)",
    transition: {
      duration: 1.2,
      ease: [0.4, 0, 0.2, 1],
    },
  },
});

export const textReveal: Variants = {
  hidden: {
    y: 40,
    opacity: 0,
    filter: "blur(6px)",
  },
  show: {
    y: 0,
    opacity: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.8,
      ease: [0.4, 0, 0.2, 1],
      delay: 0.6,
    },
  },
};
