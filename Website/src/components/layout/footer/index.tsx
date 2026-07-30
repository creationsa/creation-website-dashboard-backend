import SocialMedia from "@/components/common/socialMedia";
import MainTitle from "@/components/ui/MainTitle";
import { getCurrentLocale } from "@/lib/getCurrentLocale";
import getTrans from "@/lib/translation";
import CopyRight from "./CopyRight";
import FooterStatement from "./FooterStatement";
import ProjectMenus from "./ProjectMenus";
import SiteDescription from "./SiteDescription";
import TrustedPartners from "./TrustedPartners";

export default async function Footer() {
  const locale = await getCurrentLocale();

  const [common, footer] = await Promise.all([
    getTrans(locale, "common"),
    getTrans(locale, "footer"),
  ]);

  return (
    <footer className="container mt-auto">
      {/* Top background section */}
      <FooterStatement footer={footer} />

      {/* Rest of footer */}
      <div className="min-h-[400px] w-full">
        <div className="border-b py-14 sm:py-20">
          <div className="flex flex-col gap-6 sm:grid sm:grid-cols-2 sm:gap-y-20">
            <SiteDescription footer={footer} locale={locale} />
            <ProjectMenus
              mainFooterTitle={footer.menu}
              trans={common}
              locale={locale}
            />

            <div>
              <MainTitle title={footer.social} />
              <SocialMedia translations={common} />
            </div>
            <TrustedPartners footer={footer} />
          </div>
        </div>

        <CopyRight footer={footer} />
      </div>
    </footer>
  );
}
