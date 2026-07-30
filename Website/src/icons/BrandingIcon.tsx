import Icon from "@/components/ui/Icon";
import { ComponentProps } from "react";

type BrandingIconProps = ComponentProps<typeof Icon>;

export default function BrandingIcon(props: BrandingIconProps) {
  return (
    <Icon {...props}>
      <path
        d="M12 3C12 7.97056 7.97056 12 3 12C7.97056 12 12 16.0294 12 21C12 16.0294 16.0294 12 21 12C16.0294 12 12 7.97056 12 3Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  );
}
