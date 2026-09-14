import PageTitle from "@/shared/ui/PageTitle";
import Spinner from "@/shared/ui/spinner/Spinner";
import { useTranslation } from "react-i18next";
import OverviewCards from "./components/OverviewCards";
import RecentActivity from "./components/RecentActivity";
import { useStatistics } from "./hooks/useStatistics";

const EMPTY_COUNTS = {
  projects: 0,
  solutions: 0,
  blogs: 0,
  clients: 0,
  pages: 0,
  social_links: 0,
};

export default function Statistics() {
  const { t } = useTranslation();
  const { statisticsData, isStatisticsLoading } = useStatistics();

  if (isStatisticsLoading) return <Spinner size="lg" />;

  return (
    <>
      <PageTitle title={t("statistics.statistics")} />

      <div className="flex flex-col gap-6 lg:gap-10">
        <OverviewCards counts={statisticsData?.counts ?? EMPTY_COUNTS} />

        <RecentActivity items={statisticsData?.recent ?? []} />
      </div>
    </>
  );
}
