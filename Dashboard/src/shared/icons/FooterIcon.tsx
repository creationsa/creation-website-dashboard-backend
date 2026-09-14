import Icon from "../ui/Icon";
import type { IconProps } from "./types";

export default function FooterIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M17 18h-4v-1h4zm-9 0h3v-1H8zm12-4h-7v1h7zm-9 0H4v1h7zM23 3v18H1V3zm-1 9H2v8h20zm0-8H2v7h20z" />
      <path fill="none" d="M0 0h24v24H0z" />
    </Icon>
  );
}
