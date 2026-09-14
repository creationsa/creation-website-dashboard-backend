import Icon from "../ui/Icon";
import type { IconProps } from "./types";

export default function ChartIcon(props: IconProps) {
  return (
    <Icon {...props} stroke="currentColor" fill="none">
      <g>
        <path className="cls-1" d="M12,2A10,10,0,1,0,22,12H12Z" />

        <path className="cls-1" d="M15,9h6.54A10,10,0,0,0,15,2.46Z" />
      </g>
    </Icon>
  );
}
