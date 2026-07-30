import { RightArrowIcon } from "@/icons";
import Link from "next/link";

interface ActionLinkProps {
  href: string;
  content: string;
  external?: boolean;
}

export default function ActionLink({
  href,
  content,
  external = false,
}: ActionLinkProps) {
  const className =
    "group flex items-center gap-3.5 self-end text-2xl uppercase";

  const children = (
    <>
      <span>{content}</span>

      <span className="dark:text-black-100 text-white-100 bg-tiffany-600 dark:bg-tiffany-100 rounded-full p-2.5 transition group-hover:translate-x-1 rtl:scale-x-[-1] rtl:group-hover:-translate-x-1">
        <RightArrowIcon />
      </span>
    </>
  );

  if (external) {
    return (
      <a href={href} className={className} aria-label={content}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className} aria-label={content}>
      {children}
    </Link>
  );
}
