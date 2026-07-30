import type { MouseEventHandler, ReactNode, SVGProps } from "react";

interface IconProps extends SVGProps<SVGSVGElement> {
  children: ReactNode;
  className?: string;
  onClick?: MouseEventHandler<SVGSVGElement>;
  viewBox?: string;
  fill?: string;
  stroke?: string;
  strokeWidth?: string | number;
}

export default function Icon({
  children,
  className = "size-4 sm:size-6",
  onClick,
  viewBox = "0 0 24 24",
  fill = "currentColor",
  stroke = "none",
  strokeWidth = 2,
  ...props
}: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={viewBox}
      fill={fill}
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      onClick={onClick}
      className={className}
      {...props}
    >
      {children}
    </svg>
  );
}
