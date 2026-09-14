import Header from "@/components/ui/Header";
import TextWithMotion from "@/components/ui/TextWithMotion";
import ProjectsGrid from "./ProjectsGrid";
import { AllProjectsProps } from "./types";

export default function AllProjects({
  mainData,
  locale,
  projects,
}: AllProjectsProps) {
  return (
    <section className="overflow-hidden">
      <div className="container">
        <div className="flex flex-col gap-[55px]">
          {/* HEADER */}
          <Header
            title={mainData.first_title}
            description={mainData.second_title}
            subDescription={mainData.third_title}
            lang={locale}
            hasContainer={false}
          />

          <TextWithMotion text={mainData.overview_description} lang={locale} />
        </div>

        {/* PROJECTS GRID */}
        <ProjectsGrid projects={projects} />
      </div>
    </section>
  );
}
