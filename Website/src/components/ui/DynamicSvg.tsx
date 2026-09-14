"use client";

import SVG from "react-inlinesvg";

interface DynamicSvgProps {
  src: string;
  size?: string;
  className?: string;
  title?: string;
}

export default function DynamicSvg({
  src,
  size,
  className = "",
  title = "Icon",
}: DynamicSvgProps) {
  return (
    <div
      className={`${className}`}
      style={size ? { width: size, height: size } : undefined}
    >
      <SVG src={src} cacheRequests title={title} loader={<span />} />
    </div>
  );
}
