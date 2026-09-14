import Button from "@/shared/ui/Button";
import type { AddNewBlockProps } from "./types";

export default function AddNewBlock({
  count,
  onAdd,
  managementLabel,
  addLabel,
}: AddNewBlockProps) {
  return (
    <div className="flex items-center justify-between">
      <h3 className="font-semibold">
        {managementLabel} ({count})
      </h3>

      <Button
        type="button"
        variation="secondary"
        onClick={onAdd}
        className="w-fit!"
      >
        {addLabel}
      </Button>
    </div>
  );
}
