import Icon from "../ui/Icon";
import type { IconProps } from "./types";

export default function MinusIcon(props: IconProps) {
  return (
    <Icon {...props} stroke="currentColor" fill="none">
      <path
        d="M6 12L18 12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  );
}
