"use client";

import { AnimatePresence, motion } from "framer-motion";

type Props = {
  status: "idle" | "success" | "error";
  successMessage: string;
  errorMessage: string;
};

const variants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
};

export default function FormStatusMessage({
  status,
  successMessage,
  errorMessage,
}: Props) {
  return (
    <AnimatePresence mode="wait">
      {status === "success" && (
        <motion.span
          key="success"
          variants={variants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.25 }}
          className="dark:text-tiffany-100 text-tiffany-600 -mt-8 block text-center text-sm"
        >
          {successMessage}
        </motion.span>
      )}

      {status === "error" && (
        <motion.span
          key="error"
          variants={variants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.25 }}
          className="-mt-8 block text-center text-sm text-red-400 dark:text-red-500"
        >
          {errorMessage}
        </motion.span>
      )}
    </AnimatePresence>
  );
}
