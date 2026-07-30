import Network from "@/components/common/network";
import PageBanner from "@/components/common/pageBanner";
import AllProjects from "@/components/pages/project/AllProjects";
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

  const [common, project] = await Promise.all([
    getTrans(locale, "common"),
    getTrans(locale, "project"),
  ]);

  const title = `${common.creation} | ${common.portfolio}`;

  const description = project.seo_description;

  const currentUrl = `https://www.creation.sa/${locale}/projects`;
  const imageUrl = `https://www.creation.sa/images/home/creation-seo-${locale}-cover.jpg`;

  return {
    title,
    description,

    keywords: [
      "مشاريع إبداعية",
      "مشاريع براندنج",
      "معرض الأعمال",
      "بورتفوليو إبداعي",
      "مشاريع رقمية",
      "حملات تسويقية",
      "مشاريع الهوية البصرية",
      "مشاريع المواقع الإلكترونية",
      "مشاريع UI/UX",
      "حملات إعلانية",
      "مشاريع الإنتاج",
      "دراسات حالة إبداعية",
      "الأعمال المميزة",
      "بورتفوليو الوكالة",
      "مشاريع براندنج استراتيجية",
      "مشاريع التجارب الرقمية",
      "الإنتاج التجاري",
      "عرض الهويات البصرية",
      "حلول إبداعية",
      "مشاريع تطوير العلامات التجارية",
      "أفضل مشاريع البراندنج",
      "معرض أعمال وكالة إبداعية",
      "دراسات حالة التسويق الرقمي",
      "معرض تصميم المواقع",
      "مشاريع وكالة إعلانات",
      "بورتفوليو حملات السوشيال ميديا",
      "أعمال الاستوديو الإبداعي",
      "هندسة الثقافة",
      "أعمال إبداعية استراتيجية",
      "علامات تجارية صُممت للريادة",
      "تجارب علامات تجارية جاهزة للمستقبل",
      "عالمي بالتصميم",
      "أنظمة وتجارب إبداعية",
      "إبداع قائم على الدقة",
      "وكالة إبداعية في السعودية",
      "وكالة إعلانات في الرياض",
      "وكالة إبداعية في مصر",
      "تصميم الهوية البصرية",
      "تصميم الشعارات والهوية",
      "أعمال الحملات الرقمية",
      "دراسات الحملات الإعلانية",
      "حملات السوشيال ميديا",
      "تطوير العلامات التجارية",
      "بناء وتموضع العلامة التجارية",
      "أعمال الإنتاج",
      "الحملات الرقمية",
      "العلامات التجارية والإعلان",
      "التسويق الرقمي والخدمات",
      "تصميم المواقع وتطوير التطبيقات",
      "الإنتاج والخدمات المتكاملة",
      "صناعة محتوى",
      "براندات",
      "شركات ناشئة",
      "Marketing Automation Agency",
      "Conversion Focused Marketing",
      "Growth Marketing Solutions",
      "Paid Media Strategy",
      "Digital Strategy Agency",
      "Performance Marketing Agency",
      "Google Ads Agency Riyadh",
      "Premium Brand Strategy",
      "Cultural Branding Agency",
      "Industry Benchmark Branding",
      "Strategic Creative Consultancy",
      "Cultural Branding",
      "Website Design Company for Luxury Brands",
      "Strategic Digital Marketing for Businesses",
      "Logo & Identity Design",
      "Creative Brand Development",
      "Brand Positioning",
      "Production Portfolio",
      "Branding Case Studies",
      "Marketing Campaign Projects",
      "Creative Work Showcase",
      "Social Media Campaigns",
      "UI UX Projects",
      "Digital Campaign",
      "Performance Marketing",
      "Branding Projects",
      "Portfolio",
      "Featured Work",
      "Agency Portfolio",
      "Creative Solutions",
      "Strategic Creative Work",
      "Brands Built to Lead",
      "Global by Design",
      "Precision-Led Creativity",
      "Trusted by Industry Pioneers",
      "Studio Work",
      "Executions",
      "Creations",
      "Experiences",
      "Collaborations",
      "Digital Experiences",
      "Brand Authority",
      "Branding and Advertising",
      "Digital Marketing and Services",
      "Websites and Platforms",
      "Production and Services",
      "Content Creation",
    ],

    alternates: {
      canonical: currentUrl,
      languages: {
        ar: `https://www.creation.sa/ar/projects`,
        en: `https://www.creation.sa/en/projects`,
      },
    },

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

export default async function Project() {
  const locale = await getCurrentLocale();

  const [{ home }, project, network] = await Promise.all([
    getTrans(locale, "common"),
    getTrans(locale, "project"),
    getTrans(locale, "network"),
  ]);

  return (
    <>
      <PageBanner
        pageTitle={project.header_title}
        home={home}
        titleCut={project.title_cut}
      />

      <AllProjects project={project} locale={locale} />

      <Network network={network} />
    </>
  );
}
