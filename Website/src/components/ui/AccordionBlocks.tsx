export interface AccordionBlock {
  subtitle: string | null;
  description: string;
}

interface AccordionBlocksProps {
  blocks?: AccordionBlock[];
}

export default function AccordionBlocks({ blocks = [] }: AccordionBlocksProps) {
  return (
    <div className="flex flex-col gap-3 pt-2">
      {blocks.map((block, index) => (
        <span key={index}>
          {block.subtitle && (
            <span className="text-black-100 dark:text-white-100">
              {block.subtitle}:{" "}
            </span>
          )}

          {block.description}
        </span>
      ))}
    </div>
  );
}
