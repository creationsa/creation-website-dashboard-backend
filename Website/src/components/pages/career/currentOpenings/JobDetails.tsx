interface JobDetailsProps {
  roleLabel: string;
  roleDescription: string;
  focusLabel: string;
  focusDescription: string;
}

export default function JobDetails({
  roleLabel,
  roleDescription,
  focusLabel,
  focusDescription,
}: JobDetailsProps) {
  return (
    <div className="flex flex-col gap-3 pt-2">
      <span>
        <span className="text-black-100 dark:text-white-100">
          {roleLabel}:{" "}
        </span>

        {roleDescription}
      </span>

      <span>
        <span className="text-black-100 dark:text-white-100">
          {focusLabel}:{" "}
        </span>

        {focusDescription}
      </span>
    </div>
  );
}
