import NotFoundPage from "@/components/common/notFoundPage";
import { getCurrentLocale } from "@/lib/getCurrentLocale";
import getTrans from "@/lib/translation";

export default async function NotFound() {
  const locale = await getCurrentLocale();

  const [{ back_to_home, not_found_number }, project, projectDetails] =
    await Promise.all([
      getTrans(locale, "common"),
      getTrans(locale, "project"),
      getTrans(locale, "projectDetails"),
    ]);

  return (
    <NotFoundPage
      title={projectDetails.project_not_found_title}
      description={projectDetails.project_not_found_desc}
      backToHome={back_to_home}
      number={not_found_number}
      locale={locale}
      hasSecondButton
      secondButtonTitle={project.see_more_work}
      secondButtonHref={`/${locale}/projects`}
    />
  );
}
