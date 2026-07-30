import AppButton from "@/components/ui/AppButton";
import Header from "@/components/ui/Header";
import ProjectSlider from "./ProjectSlider";
import { ProjectsProps } from "./types";

export default function Projects({
  project,
  project_details,
  locale,
}: ProjectsProps) {
  return (
    <section className="container">
      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <Header
          title={project.header_title_home}
          description={project.header_title_desc}
          subDescription={project.header_title_sub_desc}
          hasContainer={false}
          inlineHeadings
          lang={locale}
        />

        <AppButton
          label={project.see_more_work}
          href={`/${locale}/projects`}
          className="sm:self-end"
        />
      </div>

      <ProjectSlider project_details={project_details} locale={locale} />
    </section>
  );
}
