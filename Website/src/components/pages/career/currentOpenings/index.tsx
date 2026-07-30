import Accordion from "@/components/ui/Accordion";
import Header from "@/components/ui/Header";
import { CurrentOpeningsProps } from "../types";
import JobDetails from "./JobDetails";
import Video from "@/components/ui/Video";

export default function CurrentOpenings({
  career,
  locale,
}: CurrentOpeningsProps) {
  return (
    <section className="container">
      <div className="flex flex-col justify-between gap-5 md:flex-row">
        <Header
          description={career.header_description}
          subDescription={career.header_sub_description}
          hasContainer={false}
          lang={locale}
        />

        <span className="mt-auto text-2xl font-semibold uppercase">
          {career.header_brief}
        </span>
      </div>

      {/* VIDEO */}
      <Video
        src="https://creation.sa/videos/home.mp4"
        poster="https://creation.sa/images/coverVideos/creation_home_bg.jpg"
        containerClassName="relative my-10 aspect-video w-full md:aspect-21/9"
        className="h-full w-full object-cover"
      />

      {/* Current Jobs */}
      <Accordion
        content={career.current_jobs.map((job) => ({
          title: job.title,
          description: (
            <JobDetails
              roleLabel={career.the_role}
              roleDescription={job.role_description}
              focusLabel={career.focus}
              focusDescription={job.focus_description}
            />
          ),
        }))}
      />
    </section>
  );
}
