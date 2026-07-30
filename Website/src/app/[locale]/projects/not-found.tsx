import NotFoundPage from "@/components/common/notFoundPage";
import { getCurrentLocale } from "@/lib/getCurrentLocale";
import getTrans from "@/lib/translation";

export default async function NotFound() {
  const locale = await getCurrentLocale();

  const [{ project_details, back_to_home, not_found_number }, project] =
    await Promise.all([
      getTrans(locale, "common"),
      getTrans(locale, "project"),
    ]);

  return (
    <NotFoundPage
      title={project_details.project_not_found_title}
      description={project_details.project_not_found_desc}
      backToHome={back_to_home}
      number={not_found_number}
      locale={locale}
      hasSecondButton
      secondButtonTitle={project.see_more_work}
      secondButtonHref={`/${locale}/projects`}
    />
  );
}
