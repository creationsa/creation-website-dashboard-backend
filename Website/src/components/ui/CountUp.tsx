"use client";

import { useEffect, useRef, useState } from "react";

type CountUpProps = {
  value: string;
  duration?: number;
};

export default function CountUp({ value, duration = 1500 }: CountUpProps) {
  const [count, setCount] = useState(0);
  const [hasPlayed, setHasPlayed] = useState(false);
  const ref = useRef<HTMLSpanElement | null>(null);

  const numericValue = parseInt(value.replace(/\D/g, ""), 10) || 0;
  const suffix = value.replace(/[0-9]/g, "");

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasPlayed) {
          setHasPlayed(true);

          let start = 0;
          const increment = numericValue / (duration / 16);

          const counter = setInterval(() => {
            start += increment;

            if (start >= numericValue) {
              setCount(numericValue);
              clearInterval(counter);
            } else {
              setCount(Math.floor(start));
            }
          }, 16);
        }
      },
      { threshold: 0.5 },
    );

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [numericValue, duration, hasPlayed]);

  const formatted = new Intl.NumberFormat("en-US").format(count);

  return (
    <span ref={ref}>
      {formatted}
      {suffix}
    </span>
  );
}
