"use client";

import Header from "@/components/ui/Header";
// import { useMemo, useState } from "react";
import { PROJECTS } from "./ourProjects";
import ProjectsGrid from "./ProjectsGrid";
// import ProjectTabs from "./ProjectTabs";
// import { ProjectTab } from "./tabs";
import { AllProjectsProps } from "./types";
import TextWithMotion from "@/components/ui/TextWithMotion";

export default function AllProjects({ project, locale }: AllProjectsProps) {
  // const [activeTab, setActiveTab] = useState<ProjectTab>("all");

  // const filteredProjects = useMemo(() => {
  //   if (activeTab === "all") return PROJECTS;

  //   return PROJECTS.filter((p) =>
  //     Array.isArray(p.type) ? p.type.includes(activeTab) : p.type === activeTab,
  //   );
  // }, [activeTab]);

  return (
    <section className="overflow-hidden">
      <div className="container">
        <div className="flex flex-col gap-[55px]">
          {/* HEADER */}
          <Header
            title={project.title}
            description={project.title_description}
            subDescription={project.title_sub_description}
            lang={locale}
            hasContainer={false}
          />

          <TextWithMotion text={project.deep_description} lang={locale} />
          {/* TABS */}
          {/* <ProjectTabs
            activeTab={activeTab}
            onChange={setActiveTab}
            labels={project}
          /> */}
        </div>

        {/* PROJECTS GRID */}
        <ProjectsGrid
          // key={activeTab}
          projects={PROJECTS}
          project={project}
        />
      </div>
    </section>
  );
}
