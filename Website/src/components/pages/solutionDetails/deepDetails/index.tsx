import { DeepDetailsProps } from "../types";

export default function DeepDetails({
  solutionData,
  solution_details,
}: DeepDetailsProps) {
  return (
    <section className="container">
      <div className="ms-auto w-full text-2xl xl:w-1/2">
        <h3 className="mb-8 text-xl capitalize sm:text-2xl">
          {solution_details.execution_framework}
        </h3>

        <ul className="list-outside list-disc space-y-4 ps-6">
          {solutionData.features.map((feature) => (
            <li key={feature.title}>
              <p>
                <span className="text-black-100 dark:text-white-100">
                  {feature.title}:{" "}
                </span>
                {feature.description}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
