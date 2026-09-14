import Icon from "../ui/Icon";
import type { IconProps } from "./types";

export default function PlusIcon(props: IconProps) {
  return (
    <Icon {...props} stroke="currentColor" fill="none">
      <path
        d="M4 12H20M12 4V20"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  );
}
