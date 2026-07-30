import Image from "next/image";
import footerImg from "../../../../public/images/layout/footerStatement.svg";
import { FooterStatementProps } from "./types";

export default function FooterStatement({ footer }: FooterStatementProps) {
  return (
    <div className="border-y py-10 lg:py-14">
      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <div className="relative w-[15%] md:w-[10%] xl:w-[8%]">
          <Image
            src={footerImg}
            alt={footer.footer_statement}
            className="object-cover"
          />
        </div>
        <p className="flex-1 text-xs sm:text-base sm:leading-7! md:w-[80%] md:text-base lg:max-w-[65%] lg:text-base xl:text-base 2xl:text-base">
          {footer.footer_brief}
        </p>
      </div>
    </div>
  );
}
