import Icon from "../ui/Icon";
import type { IconProps } from "./types";

export default function HomeIcon(props: IconProps) {
  return (
    <Icon {...props} viewBox="0 0 24 24">
      <path
        d="M3 11.5 12 4l9 7.5"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <path
        d="M5 10v9a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1v-9"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </Icon>
  );
}
