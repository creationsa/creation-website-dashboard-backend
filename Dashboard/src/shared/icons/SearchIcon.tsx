import Icon from "../ui/Icon";
import type { IconProps } from "./types";

export default function SearchIcon(props: IconProps) {
  return (
    <Icon {...props} stroke="currentColor" fill="none">
      <circle cx="11" cy="11" r="7" strokeWidth="2" />
      <path
        d="M21 21L16.65 16.65"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  );
}
