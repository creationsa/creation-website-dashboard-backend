import type { SubHeadTitleProps } from "../../types";

export default function SubHeadTitle({ title }: SubHeadTitleProps) {
  return (
    <span className="border-b pb-2 text-lg font-semibold uppercase">
      {title}
    </span>
  );
}
