import HeroImage from "@/components/common/heroImage";
import News from "@/components/common/news";
import PageBanner from "@/components/common/pageBanner";
import TeamSection from "@/components/common/teamSection";
import { getCurrentLocale } from "@/lib/getCurrentLocale";
import getTrans from "@/lib/translation";
import { Metadata } from "next";

export const metadata: Metadata = {
  keywords: [
    "Authority",
    "Mastery",
    "Impact",
    "Expertise",
    "Industry-leading",
    "Proven track record",
    "Certified Accredited",
    "Professionalism",
    "Trusted partner",
    "Client-centric",
    "Customized solutions",
    "Innovative approach",
    "Tailored strategy",
    "High-end results",
    "Unmatched quality",
    "Scalable growth",
    "Seamless execution",
    "Transforming",
    "Empowering",
    "Establishing",
    "Elevating",
    "Optimizing",
    "Delivering excellence",
    "Global standards",
    "Legacy",
    "Manifesting visions",
    "Aspiration",
    "Pioneering",
    "Synergy",
    "Authenticity",
    "Exclusivity",
    "Who we are",
    "Our Mission",
    "Core values",
    "Milestones",
    "Our team",
    "Legacy of success",
    "Distinctive identity",
    "Elite standards",
    "Niche expertise",
    "Sustainable growth",
    "Precision-engineered",
    "Holistic solutions",
    "Creation",
    "Benchmark",
    "مرجع",
    "إتقان",
    "تأثير",
    "خبرة تخصص",
    "رائد في القطاع",
    "سجل حافل بالنجاحات",
    "معتمد موثق",
    "احترافية",
    "شريك موثوق",
    "نتمحور حول العميل",
    "حلول مخصصة",
    "نهج ابتكاري",
    "استراتيجية مفصلة",
    "نتائج فاخرة عالية المستوى",
    "جودة لا تضاهى",
    "نمو متدرج",
    "تنفيذ متقن",
    "تحويل",
    "تمكين",
    "الارتقاء بـ",
    "تحسين تجويد",
    "تقديم التميز",
    "معايير عالمية",
    "إرث",
    "تجسيد الرؤى",
    "طموح",
    "ريادة",
    "تفرّد حصرية",
    "من نحن",
    "رسالتنا",
    "القيم الجوهرية",
    "محطات النجاح",
    "فريقنا",
    "تاريخ من النجاح",
    "هوية متميزة",
    "معايير النخبة",
    "خبرة في مجالات دقيقة",
    "نمو مستدام",
    "مصممة بدقة",
    "حلول شمولية",
    "إبداع صناعة",
    "معيار مرجعية",
  ],
};

export default async function Team() {
  const locale = await getCurrentLocale();

  const [{ team, home }, teams, about, news] = await Promise.all([
    getTrans(locale, "common"),
    getTrans(locale, "teams"),
    getTrans(locale, "about"),
    getTrans(locale, "news"),
  ]);

  return (
    <>
      <PageBanner pageTitle={team} home={home} />

      <h2 className="container font-semibold uppercase">
        {teams.main_description_1}{" "}
        <span className="dark:text-black-100 text-white-100 bg-tiffany-600 dark:bg-tiffany-100 px-2">
          {teams.main_description_2}
        </span>{" "}
        {teams.main_description_3}
      </h2>

      <HeroImage
        yearsValue={about.years_stats}
        yearsLabel={about.years_experience}
      />

      <News data={news.items} />

      <TeamSection
        title={teams.our_team}
        description={teams.team_header_desc}
        subDescription={teams.team_header_sub_description}
        locale={locale}
      />
    </>
  );
}
