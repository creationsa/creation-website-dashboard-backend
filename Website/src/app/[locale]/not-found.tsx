import NotFoundPage from "@/components/common/notFoundPage";
import { getCurrentLocale } from "@/lib/getCurrentLocale";
import getTrans from "@/lib/translation";

export default async function NotFound() {
  const locale = await getCurrentLocale();

  const {
    page_not_found_title,
    page_not_found_desc,
    back_to_home,
    not_found_number,
  } = await getTrans(locale, "common");

  return (
    <NotFoundPage
      title={page_not_found_title}
      description={page_not_found_desc}
      backToHome={back_to_home}
      number={not_found_number}
      locale={locale}
    />
  );
}
