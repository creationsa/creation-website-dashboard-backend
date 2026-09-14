import Header from "@/components/ui/Header";
import { TextListSectionProps } from "./types";
import StickySidebar from "./StickySidebar";
import TextListItem from "./TextListItem";

export default function TextListSection({
  content,
  locale,
}: TextListSectionProps) {
  return (
    <section className="container flex flex-col gap-14">
      <Header
        title={content.first_title}
        description={content.second_title || ""}
        subDescription={content.third_title}
        hasContainer={false}
        lang={locale}
      />

      <div
        className={
          content.has_sticky_sidebar
            ? "grid grid-cols-1 gap-16 lg:grid-cols-2 lg:items-start lg:gap-0"
            : "flex flex-col gap-20"
        }
      >
        {content.has_sticky_sidebar && (
          <StickySidebar
            sectionsLabel={content.sections_label || ""}
            stickyDescription={content.sticky_description}
            items={content.items}
          />
        )}

        <div className="flex flex-col gap-20">
          {content.items.map((item, itemIndex) => (
            <TextListItem
              key={itemIndex}
              item={item}
              index={itemIndex}
              hasStickySidebar={content.has_sticky_sidebar}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
