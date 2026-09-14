import { MediaContentSectionProps } from "./types";
import ListContent from "./ListContent";
import MediaBlock from "./MediaBlock";
import RichContent from "./RichContent";

export default function MediaContentSection({
  content,
  locale,
}: MediaContentSectionProps) {
  return (
    <section
      className={`container flex flex-col items-center justify-between gap-10 ${
        content.is_media_right ? "lg:flex-row-reverse" : "lg:flex-row"
      }`}
    >
      <MediaBlock
        media={content.media}
        is_media_right={content.is_media_right}
        is_list={content.content_type === "list"}
      />

      {content.content_type === "list" ? (
        <ListContent content={content} />
      ) : (
        <RichContent content={content} locale={locale} />
      )}
    </section>
  );
}
