import MainTitle from "@/components/ui/MainTitle";
import Image from "next/image";
import { LocationSectionProps } from "./types";

export default function LocationSection({
  title,
  address,
  phone,
  email,
  image,
  reverse = false,
}: LocationSectionProps) {
  return (
    <section
      className={`container flex items-center justify-between gap-10 ${reverse ? "flex-col-reverse lg:flex-row-reverse" : "flex-col-reverse lg:flex-row"}`}
    >
      {/* CONTENT */}
      <div className="flex flex-col gap-4 md:w-[calc(50%)]">
        <MainTitle title={title} />

        <h3 className="text-3xl leading-11 font-semibold capitalize sm:text-5xl sm:leading-13 sm:tracking-wider rtl:sm:leading-16">
          {address}
        </h3>

        <p>
          <span className="block">{phone}</span>
          <span>{email}</span>
        </p>
      </div>

      {/* IMAGE */}
      <div className="relative aspect-4/3 w-full md:w-[calc(50%+40px)]">
        <Image src={image} alt={title} fill className="object-cover" />
      </div>
    </section>
  );
}
