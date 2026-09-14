import Accordion from "@/components/ui/Accordion";
import AccordionBlocks from "@/components/ui/AccordionBlocks";
import Header from "@/components/ui/Header";
import Video from "@/components/ui/Video";
import { OurCapabilitiesProps } from "../types";

export default function OurCapabilities({
  mainData,
  locale,
}: OurCapabilitiesProps) {
  const { accordion_items_header, accordion_items, accordion_media, accordion_media_poster } =
    mainData;

  return (
    <section className="container flex flex-col items-center justify-between gap-10 lg:flex-row">
      <div className="flex flex-col gap-4 lg:w-[40%]">
        {/* CONTENT */}
        <Header
          title={accordion_items_header.first_title}
          description={accordion_items_header.second_title}
          subDescription={accordion_items_header.third_title}
          hasContainer={false}
          lang={locale}
          styles="w-full mb-10"
        />

        <Accordion
          content={accordion_items.map((item) => ({
            title: item.title,
            description: <AccordionBlocks blocks={item.content_blocks} />,
          }))}
        />
      </div>

      {/* VIDEO */}
      {accordion_media && (
        <Video
          src={accordion_media}
          poster={accordion_media_poster ?? ""}
          containerClassName="relative aspect-4/3 w-full lg:w-[60%]"
          className="h-full object-cover"
        />
      )}
    </section>
  );
}
