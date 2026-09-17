import { TextBlockProps } from "./types";

export default function TextBlock({ block, index }: TextBlockProps) {
  if (block.block_type === "list") {
    return (
      <ul className="list-outside list-disc space-y-4 ps-6">
        {block.points.map((point, pointIndex) => (
          <li key={pointIndex}>
            <p>
              {point.label && (
                <span className="text-black-100 dark:text-white-100">
                  {point.label}:{" "}
                </span>
              )}
              {point.description}
            </p>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <p
      key={index}
      className="text-lg text-gray-600 md:me-auto dark:text-gray-500"
    >
      {block.description}
    </p>
  );
}
