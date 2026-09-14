import { TextBlockProps } from "./types";

export default function TextBlock({ block, index }: TextBlockProps) {
  if (block.block_type === "list") {
    return (
      <ul className="list-outside list-disc space-y-4 ps-6">
        {block.points.map((point, pointIndex) => (
          <li key={pointIndex}>
            <p>{point.text}</p>
          </li>
        ))}
      </ul>
    );
  }

  return <p key={index}>{block.description}</p>;
}
