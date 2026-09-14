import Icon from "../ui/Icon";
import type { IconProps } from "./types";

export default function ChevronDownIcon(props: IconProps) {
  return (
    <Icon {...props} stroke="currentColor" fill="none">
      <path
        d="M6 9L12 15L18 9"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  );
}
