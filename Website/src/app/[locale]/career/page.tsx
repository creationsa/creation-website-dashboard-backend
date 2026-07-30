import CTASection from "@/components/common/cTASection";
import Network from "@/components/common/network";
import PageBanner from "@/components/common/pageBanner";
import CurrentOpenings from "@/components/pages/career/currentOpenings";
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

  const [common, career] = await Promise.all([
    getTrans(locale, "common"),
    getTrans(locale, "career"),
  ]);

  const title = `${common.creation} | ${common.career}`;

  const description = career.seo_description;

  const currentUrl = `https://www.creation.sa/${locale}/career`;
  const imageUrl = `https://www.creation.sa/images/home/creation-seo-${locale}-cover.jpg`;

  return {
    title,
    description,

    alternates: {
      canonical: currentUrl,
      languages: {
        ar: `https://www.creation.sa/ar/career`,
        en: `https://www.creation.sa/en/career`,
      },
    },

    keywords: [
      "Careers",
      "Vacancies",
      "Jobs",
      "Hiring",
      "Career Opportunities",
      "Join Our Team",
      "Creative Careers",
      "Agency Careers",
      "Branding Careers",
      "Marketing Careers",
      "Digital Careers",
      "Technology Careers",
      "Innovation Careers",
      "Strategy Careers",
      "Design Careers",
      "Creative Opportunities",
      "Creative Talent",
      "Creative Culture",
      "Future Careers",
      "Creative Agency Jobs",
      "Digital Agency Careers",
      "Brand Strategy Jobs",
      "Visual Design Careers",
      "Art Direction Jobs",
      "Creative Director Jobs",
      "Marketing Strategy Careers",
      "Performance Marketing Jobs",
      "Data Analyst Jobs",
      "Senior Data Analyst",
      "Full Stack Developer",
      "Systems Architect",
      "DevOps Engineer",
      "Automation Engineer",
      "QA Specialist",
      "Software Quality Assurance",
      "Cloud Infrastructure Jobs",
      "AWS Careers",
      "Azure Careers",
      "CI/CD Engineer",
      "UX Careers",
      "UI Design Jobs",
      "Content Strategy Jobs",
      "Saudi Arabia Careers",
      "Riyadh Jobs",
      "Digital Innovation Careers",
      "Branding Agency Jobs",
      "Creative Industry Careers",
      "Experience Design Careers",
      "Digital Transformation Jobs",
      "Tech Careers",
      "Creative Leadership",
      "Innovation Jobs",
      "Strategic Thinking",
      "Creative Professionals",
      "الوظائف",
      "الفرص الوظيفية",
      "وظائف شاغرة",
      "التوظيف",
      "فرص العمل",
      "انضم إلينا",
      "وظائف إبداعية",
      "وظائف وكالات",
      "وظائف البراندنج",
      "وظائف التسويق",
      "وظائف رقمية",
      "وظائف تقنية",
      "وظائف الابتكار",
      "وظائف الاستراتيجية",
      "وظائف التصميم",
      "فرص إبداعية",
      "المواهب الإبداعية",
      "بيئة إبداعية",
      "وظائف المستقبل",
      "وظائف وكالة إبداعية",
      "وظائف وكالة رقمية",
      "وظائف استراتيجية العلامات التجارية",
      "وظائف التصميم البصري",
      "وظائف الإخراج الفني",
      "وظائف المدير الإبداعي",
      "وظائف التسويق الاستراتيجي",
      "وظائف الأداء التسويقي",
      "وظائف تحليل البيانات",
      "محلل بيانات أول",
      "مطور Full Stack",
      "مهندس نظم برمجية",
      "مهندس DevOps",
      "مهندس أتمتة",
      "أخصائي جودة برمجيات",
      "ضمان الجودة",
      "وظائف البنية التحتية السحابية",
      "وظائف AWS",
      "وظائف Azure",
      "مهندس CI/CD",
      "وظائف UX",
      "وظائف UI",
      "وظائف استراتيجية المحتوى",
      "وظائف السعودية",
      "وظائف الرياض",
      "وظائف الابتكار الرقمي",
      "وظائف العلامات التجارية",
      "وظائف الصناعات الإبداعية",
      "وظائف تصميم التجارب",
      "وظائف التحول الرقمي",
      "القيادة الإبداعية",
      "التفكير الاستراتيجي",
      "محترفون مبدعون",
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

export default async function Career() {
  const locale = await getCurrentLocale();

  const [common, career, network] = await Promise.all([
    getTrans(locale, "common"),
    getTrans(locale, "career"),
    getTrans(locale, "network"),
  ]);

  return (
    <>
      <PageBanner pageTitle={common.career} home={common.home} />

      <CurrentOpenings career={career} locale={locale} />

      <CTASection
        title={career.next_job_title}
        description={career.next_job_description}
        actionLabel={career.apply_now}
        actionHref="mailto:hello@creation.sa"
        external
      />

      <Network network={network} />
    </>
  );
}
