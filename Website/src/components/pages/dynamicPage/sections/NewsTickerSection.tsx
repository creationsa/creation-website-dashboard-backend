import News from "@/components/common/news";
import { NewsTickerContent } from "../types";

interface NewsTickerSectionProps {
  content: NewsTickerContent;
}

export default function NewsTickerSection({ content }: NewsTickerSectionProps) {
  if (!content.items.length) return null;

  return (
    <News
      data={content.items.map((item) => item.text)}
      hasContainer={content.has_container}
      hasBorder={content.has_border}
    />
  );
}
