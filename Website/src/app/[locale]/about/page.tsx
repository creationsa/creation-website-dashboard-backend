import Network from "@/components/common/network";
import PageBanner from "@/components/common/pageBanner";
// import TeamSection from "@/components/common/teamSection";
import MainSection from "@/components/pages/about/mainSection";
import WhyUs from "@/components/pages/about/whyUs";
import { LanguageType } from "@/i18n.config";
import { getCurrentLocale } from "@/lib/getCurrentLocale";
import getTrans from "@/lib/translation";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: LanguageType }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const [common, about] = await Promise.all([
    getTrans(locale, "common"),
    getTrans(locale, "about"),
  ]);

  const title = `${common.creation} | ${common.about_us}`;

  const description = about.seo_description;

  const currentUrl = `https://www.creation.sa/${locale}/about`;
  const imageUrl = `https://www.creation.sa/images/home/creation-seo-${locale}-cover.jpg`;

  return {
    title,
    description,

    alternates: {
      canonical: currentUrl,
      languages: {
        ar: `https://www.creation.sa/ar/about`,
        en: `https://www.creation.sa/en/about`,
      },
    },

    keywords: [
      "Expertise",
      "خبرة تخصص",
      "Industry-leading",
      "رائد في القطاع",
      "Proven track record",
      "سجل حافل بالنجاحات",
      "Certified Accredited",
      "معتمد موثق",
      "Authority",
      "سلطة مرجعية",
      "Professionalism",
      "احترافية",
      "Trusted partner",
      "شريك موثوق",
      "Client-centric",
      "نتمحور حول العميل",
      "Customized solutions",
      "حلول مخصصة",
      "Innovative approach",
      "نهج ابتكاري",
      "Tailored strategy",
      "استراتيجية مفصلة",
      "High-end results",
      "نتائج فاخرة عالية المستوى",
      "Unmatched quality",
      "جودة لا تضاهى",
      "Scalable growth",
      "نمو متدرج",
      "Seamless execution",
      "تنفيذ متقن",
      "Transforming",
      "تحويل",
      "Empowering",
      "تمكين",
      "Establishing",
      "تأسيس ترسيخ",
      "Elevating",
      "الارتقاء بـ",
      "Optimizing",
      "تحسين تجويد",
      "Delivering excellence",
      "تقديم التميز",
      "Global standards",
      "معايير عالمية",
      "Legacy",
      "إرث",
      "Manifesting visions",
      "تجسيد الرؤى",
      "Aspiration",
      "طموح",
      "Pioneering",
      "ريادة",
      "Synergy",
      "تضافر الجهود تناغم",
      "Authenticity",
      "أصالة",
      "Exclusivity",
      "تفرّد حصرية",
      "about us",
      "Who we are",
      "من نحن",
      "Our Mission",
      "رسالتنا",
      "هوية بصرية",
      "خدمات تسويقية",
      "الهوية البصرية",
      "زيادة المبيعات",
      "وكالة اعلانات في الرياض",
      "ترافيك",
      "خدمات التسويق الرقمي",
      "اعلانات ممولة",
      "تصميم هوية بصريه",
      "ذكاء اصطناعي",
      "تطوير اعمال",
      "استراتيجيه",
      "محتوى ابداعي",
      "تجربة المستخدم",
      "خطط تسويقية",
      "عائد الاستثمار",
      "Core values",
      "القيم الجوهرية",
      "Milestones",
      "محطات النجاح",
      "Our team",
      "فريقنا",
      "Legacy of success",
      "تاريخ من النجاح",
      "Distinctive identity",
      "هوية متميزة",
      "Elite standards",
      "معايير النخبة",
      "content creation",
      "ppc agency",
      "Google ads",
      "increase sales",
      "Advertising agency in Riyadh",
      "digital marketing agency in KSA",
      "case study",
      "agency in Saudi Arabia",
      "traffic",
      "integrated marketing solutions",
      "marketing partner",
      "creative content creation",
      "social media engagement",
      "Niche expertise",
      "خبرة في مجالات دقيقة",
      "Sustainable growth",
      "نمو مستدام",
      "Precision-engineered",
      "مصممة بدقة",
      "Holistic solutions",
      "حلول شمولية",
      "Creation",
      "إبداع صناعة",
      "Benchmark",
      "معيار مرجعية",
    ],

    openGraph: {
      type: "website",
      url: currentUrl,
      title,
      description,

      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: common.creation,
          type: "image/jpeg",
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
      site: currentUrl,
    },
  };
}

export default async function AboutUs() {
  const locale = await getCurrentLocale();

  const [{ home, about_us }, about, network] = await Promise.all([
    getTrans(locale, "common"),
    getTrans(locale, "about"),
    getTrans(locale, "network"),
  ]);

  return (
    <>
      <PageBanner pageTitle={about_us} home={home} />

      <MainSection locale={locale} about={about} />

      <WhyUs about={about} locale={locale} />

      {/* <TeamSection
        title={teams.header_title}
        description={teams.header_title_desc}
        subDescription={teams.header_title_sub_description}
        locale={locale}
      /> */}

      <Network network={network} />
    </>
  );
}
