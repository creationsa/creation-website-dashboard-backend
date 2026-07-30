import { type SVGProps } from "react";
import Icon from "../ui/Icon";

type HamburgerIconProps = SVGProps<SVGSVGElement>;

export default function HamburgerIcon(props: HamburgerIconProps) {
  return (
    <Icon {...props} viewBox="0 0 1024 1024">
      <path
        d="M768 306.2V383H256v-76.8h512zM256 536.6h512v-76.8H256v76.8zm0 153.6h512v-76.8H256v76.8z"
        fillRule="evenodd"
      />
    </Icon>
  );
}
