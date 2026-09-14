import FullWidthSlider from "@/components/common/fullWidthItems/FullWidthSlider";
import AppButton from "@/components/ui/AppButton";
import Header from "@/components/ui/Header";
import ContainedSlider from "./containedItems/ContainedSlider";
import { FeaturedWorksSectionProps } from "./types";

export default function FeaturedWorksSection({
  content,
  locale,
}: FeaturedWorksSectionProps) {
  const items = content.items.map((item) => ({
    title: item.title,
    slug: item.slug || "",
    image: item.image,
  }));

  return (
    <section
      className={`${content.layout_type === "contained" ? "container" : ""}`}
    >
      <div
        className={`${content.layout_type === "contained" ? "mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center" : ""}`}
      >
        <Header
          title={content.first_title}
          description={content.second_title || ""}
          subDescription={content.third_title}
          hasContainer={content.layout_type !== "contained"}
          inlineHeadings={content.layout_type === "contained"}
          lang={locale}
          styles={`${content.layout_type === "contained" ? "" : "w-full mb-20"}`}
        />

        {content.layout_type === "contained" &&
          content.action_button_text &&
          content.action_button_slug && (
            <AppButton
              label={content.action_button_text}
              href={`/${locale}/${content.action_button_slug}`}
              className="sm:self-end"
            />
          )}
      </div>
      {content.layout_type === "contained" ? (
        <ContainedSlider projects={items} locale={locale} />
      ) : (
        <FullWidthSlider items={items} locale={locale} />
      )}
    </section>
  );
}
