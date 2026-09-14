import ClientsSlider from "./ClientsSlider";
import { ClientsProps } from "./types";

export default function Clients({ data }: ClientsProps) {
  if (!data || data.logos.length === 0) return null;

  return (
    <section className="container">
      <span className="font-fancy mb-[35px] block text-center font-semibold text-gray-600 dark:text-gray-500">
        {data.title}
      </span>
      <ClientsSlider logos={data.logos} />
    </section>
  );
}
