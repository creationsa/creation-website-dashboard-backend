import BlogContent from "@/components/common/blogContent";
import TextBlock from "./TextBlock";
import { TextListItemProps } from "./types";

export default function TextListItem({
  item,
  index,
  hasStickySidebar,
}: TextListItemProps) {
  return (
    <BlogContent
      title={`${String(index + 1).padStart(2, "0")} ${item.header}`}
      className={hasStickySidebar ? "mt-0! w-full!" : "mt-0!"}
    >
      <div className="flex flex-col gap-20">
        {item.blocks.map((block, blockIndex) => (
          <TextBlock key={blockIndex} block={block} index={blockIndex} />
        ))}
      </div>
    </BlogContent>
  );
}
