import { NetworksProps } from "./types";

export default function NetworkSlideItem({ icon: Icon }: NetworksProps) {
  return (
    <Icon className="hover:text-tiffany-600 hover:dark:text-tiffany-100 text-gray-600 transition-all duration-300 dark:text-gray-500" />
  );
}
