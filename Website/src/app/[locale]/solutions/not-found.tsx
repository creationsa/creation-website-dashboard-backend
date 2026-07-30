import NotFoundPage from "@/components/common/notFoundPage";
import { getCurrentLocale } from "@/lib/getCurrentLocale";
import getTrans from "@/lib/translation";

export default async function NotFound() {
  const locale = await getCurrentLocale();

  const [{ back_to_home, not_found_number }, solutions, solution_details] =
    await Promise.all([
      getTrans(locale, "common"),
      getTrans(locale, "solutions"),
      getTrans(locale, "solutionDetails"),
    ]);

  return (
    <NotFoundPage
      title={solution_details.solution_not_found_title}
      description={solution_details.solution_not_found_desc}
      backToHome={back_to_home}
      number={not_found_number}
      locale={locale}
      hasSecondButton
      secondButtonTitle={solutions.view_all_solutions}
      secondButtonHref={`/${locale}/solutions`}
    />
  );
}
