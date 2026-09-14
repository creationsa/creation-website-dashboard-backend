import DynamicSvg from "@/components/ui/DynamicSvg";
import { ClientLogoItemProps } from "./types";

export default function ClientLogoItem({ logo }: ClientLogoItemProps) {
  return (
    <DynamicSvg
      src={logo.image}
      title={logo.alt}
      className="svg-client-wrapper svg-client h-auto w-40 2xl:w-48"
    />
  );
}
