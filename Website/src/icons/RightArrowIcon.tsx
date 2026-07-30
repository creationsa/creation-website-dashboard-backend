import Icon from "@/components/ui/Icon";
import { ComponentProps } from "react";

type RightArrowIconProps = Omit<ComponentProps<typeof Icon>, "children">;

export default function RightArrowIcon(props: RightArrowIconProps) {
  return (
    <Icon {...props}>
      <path
        d="M5 12H19M19 12L13 6M19 12L13 18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  );
}
