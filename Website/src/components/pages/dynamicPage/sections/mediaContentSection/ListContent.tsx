import MainTitle from "@/components/ui/MainTitle";
import { ListContentProps } from "./types";

export default function ListContent({ content }: ListContentProps) {
  return (
    <div className="flex flex-col gap-4 md:w-[calc(50%)]">
      <MainTitle title={content.first_title || ""} />

      <h3 className="text-3xl leading-11 font-semibold capitalize sm:text-5xl sm:leading-13 sm:tracking-wider rtl:sm:leading-16">
        {content.second_title || ""}
      </h3>
      <p>
        {content.list_items.map((item, index) => (
          <span key={index} className="block">
            <bdi>{item.text}</bdi>
          </span>
        ))}
      </p>
    </div>
  );
}
