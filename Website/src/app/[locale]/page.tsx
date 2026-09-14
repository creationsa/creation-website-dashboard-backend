import SectionRenderer from "@/components/pages/dynamicPage/SectionRenderer";
import { getPageBySlug } from "@/components/pages/dynamicPage/getPageBySlug";
import { getCurrentLocale } from "@/lib/getCurrentLocale";

export default async function Home() {
  const locale = await getCurrentLocale();

  const pageData = await getPageBySlug("home", locale);

  return (
    <>
      {pageData.sections.map((section, index) => (
        <SectionRenderer key={index} section={section} locale={locale} />
      ))}
    </>
  );
}
