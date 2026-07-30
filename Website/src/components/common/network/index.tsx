import NetworkSlider from "./NetworkSlider";
import { NetworkProps } from "./types";

export default function Network({ network }: NetworkProps) {
  return (
    <section className="container">
      <span className="font-fancy mb-[35px] block text-center font-semibold text-gray-600 dark:text-gray-500">
        {network.title}
      </span>
      <NetworkSlider />
    </section>
  );
}
