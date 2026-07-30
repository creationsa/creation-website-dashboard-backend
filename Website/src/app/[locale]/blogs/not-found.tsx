import NotFoundPage from "@/components/common/notFoundPage";
import { getCurrentLocale } from "@/lib/getCurrentLocale";
import getTrans from "@/lib/translation";

export default async function NotFound() {
  const locale = await getCurrentLocale();

  const [{ back_to_home, not_found_number }, blogs] = await Promise.all([
    getTrans(locale, "common"),
    getTrans(locale, "blogs"),
  ]);

  return (
    <NotFoundPage
      title={blogs.blog_not_found_title}
      description={blogs.blog_not_found_desc}
      backToHome={back_to_home}
      number={not_found_number}
      locale={locale}
      hasSecondButton
      secondButtonTitle={blogs.view_all_blogs}
      secondButtonHref={`/${locale}/blogs`}
    />
  );
}
