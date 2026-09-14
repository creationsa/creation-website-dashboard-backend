import { DeepDetailsProps } from "../types";

export default function DeepDetails({ data }: DeepDetailsProps) {
  return (
    <section className="container">
      <div className="ms-auto w-full text-2xl xl:w-1/2">
        <h3 className="mb-8 text-xl capitalize sm:text-2xl">
          {data.execution_title}
        </h3>

        <ul className="list-outside list-disc space-y-4 ps-6">
          {data.execution_keys.map((key) => (
            <li key={key.label}>
              <p>
                <span className="text-black-100 dark:text-white-100">
                  {key.label}:{" "}
                </span>
                {key.value}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
