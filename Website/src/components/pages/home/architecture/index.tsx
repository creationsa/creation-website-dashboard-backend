import { ArchitectureProps } from "./types";
import ArchitectureBackground from "./ArchitectureBackground";
import ArchitectureCornerLabels from "./ArchitectureCornerLabels";
import ArchitectureCenterContent from "./ArchitectureCenterContent";

export default function Architecture({
  architecture,
  locale,
}: ArchitectureProps) {
  return (
    <section className="relative flex h-[60vh] w-full flex-col gap-10 overflow-x-hidden overflow-y-hidden sm:min-h-screen sm:flex-row sm:gap-0">
      <ArchitectureBackground alt={architecture.the_architecture_of_culture} />

      <ArchitectureCornerLabels architecture={architecture} />

      <ArchitectureCenterContent
        headline={architecture.the_architecture_of_culture}
        description={architecture.architecture_desc}
        locale={locale}
      />
    </section>
  );
}
