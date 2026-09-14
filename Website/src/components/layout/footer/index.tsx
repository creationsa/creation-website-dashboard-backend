import SocialMedia from "@/components/common/socialMedia";
import MainTitle from "@/components/ui/MainTitle";
import { getFooter } from "@/lib/api/getFooter";
import { getCurrentLocale } from "@/lib/getCurrentLocale";
import CopyRight from "./CopyRight";
import FooterStatement from "./FooterStatement";
import ProjectMenus from "./ProjectMenus";
import SiteDescription from "./SiteDescription";
import TrustedPartners from "./TrustedPartners";

export default async function Footer() {
  const locale = await getCurrentLocale();

  const footerData = await getFooter(locale).catch(() => null);

  return (
    <footer className="container mt-auto">
      {/* STATEMENT */}
      <FooterStatement data={footerData} />

      {/* MAIN FOOTER */}
      <div className="min-h-[400px] w-full">
        <div className="border-b py-14 sm:py-20">
          <div className="flex flex-col gap-6 sm:grid sm:grid-cols-2 sm:gap-y-20">
            <SiteDescription locale={locale} data={footerData} />
            <ProjectMenus
              mainFooterTitle={footerData?.menu_title ?? ""}
              locale={locale}
              menuItems={footerData?.menu_items ?? []}
            />

            <div>
              <MainTitle title={footerData?.social_title ?? ""} />
              <SocialMedia links={footerData?.social_items} />
            </div>
            <TrustedPartners badges={footerData?.badges} />
          </div>
        </div>

        <CopyRight locale={locale} data={footerData} />
      </div>
    </footer>
  );
}
