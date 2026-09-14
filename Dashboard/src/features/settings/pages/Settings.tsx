import PageTabs from "@/shared/components/pageTabs";
import SeoForm from "@/shared/components/seoForm";
import { useGetSeoDataByModal } from "@/shared/hooks/useGetSeoDataByModal";
import PageTitle from "@/shared/ui/PageTitle";
import Spinner from "@/shared/ui/spinner/Spinner";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import SettingsForm from "../components/settingsForm";
import { useGetSettings } from "../hooks/useGetSettings";

export default function Settings() {
  const { t } = useTranslation();
  const { seoData, isSeoLoading } = useGetSeoDataByModal("home");
  const { settings, isSettingsLoading } = useGetSettings();

  const [activeTab, setActiveTab] = useState<"content" | "seo">("content");

  if (isSeoLoading || isSettingsLoading) return <Spinner size="lg" />;

  return (
    <>
      <PageTitle title={t("settings.settings")} />

      <PageTabs activeTab={activeTab} onChange={setActiveTab} />

      {activeTab === "content" && <SettingsForm settings={settings} />}

      {activeTab === "seo" && <SeoForm seoData={seoData} forType="home" />}
    </>
  );
}
