import NewsTicker from "./NewsTicker";
import { NewsProps } from "./types";

export default function News({ data, noBackground = false }: NewsProps) {
  return (
    <section>
      <NewsTicker items={data} noBackground={noBackground} />
    </section>
  );
}
