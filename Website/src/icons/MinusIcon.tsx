import Icon from "@/components/ui/Icon";
import { ComponentProps } from "react";

type MinusIconProps = Omit<ComponentProps<typeof Icon>, "children">;

export default function MinusIcon(props: MinusIconProps) {
  return (
    <Icon {...props}>
      <path
        d="M4 12L20 12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  );
}
