import { BlogContentProps } from "./types";

export default function BlogContent({
  title,
  children,
  className = "",
}: BlogContentProps) {
  return (
    <div className={`ms-auto mt-20 w-full xl:w-[50%] ${className}`}>
      <h3 className="mb-8 text-xl capitalize sm:text-2xl">{title}</h3>

      {children}
    </div>
  );
}
