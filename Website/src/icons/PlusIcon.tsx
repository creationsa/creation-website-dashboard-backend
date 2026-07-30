import Icon from "@/components/ui/Icon";
import { ComponentProps } from "react";

type PlusIconProps = Omit<ComponentProps<typeof Icon>, "children">;

export default function PlusIcon(props: PlusIconProps) {
  return (
    <Icon {...props}>
      <path
        d="M6 12H18M12 6V18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  );
}
