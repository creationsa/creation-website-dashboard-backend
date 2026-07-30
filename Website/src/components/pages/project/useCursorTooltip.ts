"use client";

import { useMotionValue, useSpring } from "framer-motion";

export function useCursorTooltip() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const x = useSpring(mouseX, { stiffness: 300, damping: 30 });
  const y = useSpring(mouseY, { stiffness: 300, damping: 30 });

  const updatePosition = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left + 20);
    mouseY.set(e.clientY - rect.top + 20);
  };

  return { x, y, updatePosition };
}
