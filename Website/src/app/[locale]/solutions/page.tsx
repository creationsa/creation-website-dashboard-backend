import PageBanner from "@/components/common/pageBanner";
import AllSolutions from "@/components/pages/solutions/allSolutions";
import CoreSolutions from "@/components/pages/solutions/coreSolutions";
import OurCapabilities from "@/components/pages/solutions/ourCapabilities";
import WhatWeOffer from "@/components/pages/solutions/whatWeOffer";
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

  const [common, solutions] = await Promise.all([
    getTrans(locale, "common"),
    getTrans(locale, "solutions"),
  ]);

  const title = `${common.creation} | ${common.solutions}`;

  const description = solutions.seo_description;

  const currentUrl = `https://www.creation.sa/${locale}/solutions`;
  const imageUrl = `https://www.creation.sa/images/home/creation-seo-${locale}-cover.jpg`;

  return {
    title,
    description,

    alternates: {
      canonical: currentUrl,
      languages: {
        ar: `https://www.creation.sa/ar/solutions`,
        en: `https://www.creation.sa/en/solutions`,
      },
    },

    keywords: [
      "تحويل الميزانيات الإعلانية إلى عوائد استثمارية ملموسة",
      "استراتيجيات نمو مخصصة للشركات الطموحة",
      "مضاعفة الحصة السوقية عبر استغلال الأصول الرقمية",
      "حلول تسويقية ذكية لرفع وتيرة نمو الأعمال",
      "السيطرة على المنافسة عبر استهداف رقمي دقيق",
      "بناء أصول رقمية تزداد قيمتها مع مرور الزمن",
      "تحويل الحضور الرقمي إلى ماكينة مبيعات متكاملة",
      "إدارة احترافية للحملات الإعلانية الضخمة والمعقدة",
      "جعل العلامة التجارية الخيار الأول في السوق",
      "صياغة حضور رقمي يفرض هيبته التنافسية",
      "الانتقال بالعلامة التجارية من المحلية إلى العالمية",
      "خطط توسع رقمي عابرة للحدود واللغات",
      "بناء قاعدة عملاء دولية عبر استراتيجيات مبتكرة",
      "الانتشار السريع والمدروس في أسواق جديدة",
      "توحيد الهوية الرقمية عبر المنصات العالمية",
      "قرارات تسويقية مبنية على تحليل البيانات الدقيقة",
      "تحسين تجربة المستخدم لرفع معدلات التحويل",
      "أتمتة العمليات التسويقية لزيادة كفاءة الأداء",
      "تحويل أرقام التحليلات إلى قصص نجاح واقعية",
      "ابتكار قنوات بيع رقمية غير تقليدية",
      "كونتنت كريشن",
      "Content creation",
      "digital marketing",
      "Branding",
      "Advertising",
      "Digital Marketing Services",
      "Social Media Marketing",
      "Digital Campaign",
      "Web Design",
      "APP Development",
      "Production Services",
      "العلامات التجارية والإعلان",
      "التسويق الرقمي والخدمات المتكاملة",
      "التسويق عبر منصات التواصل الاجتماعي",
      "إدارة الحملات الرقمية المتكاملة",
      "تصميم المواقع وتطوير التطبيقات الرقمية",
      "الإنتاج والخدمات المتكاملة",
      "نمو الشركات المتسارع",
      "إدارة الأصول الرقمية",
      "تعظيم العائد على الإنفاق الإعلاني",
      "استراتيجيات التوسع الرقمي",
      "تحويل الأعمال رقمياً",
      "إدارة الحملات الإعلانية الضخمة",
      "تحسين معدل التحويل الاستراتيجي",
      "تحليل البيانات لاتخاذ القرار",
      "هندسة الهوية الرقمية",
      "التسويق عبر محركات البحث دولياً",
      "مدير استراتيجي",
      "مدير حسابات العملاء",
      "أخصائي شراء مساحات إعلانية",
      "كاتب محتوى إعلاني",
      "صانع محتوى إبداعي",
      "مصمم جرافيك أقدم",
      "مدير فني",
      "أخصائي تحسين محركات البحث",
      "محلل بيانات تسويقية",
      "مدير منصات التواصل الاجتماعي",
      "مطور واجهات المواقع",
      "أخصائي أتمتة تسويق",
      "منتج فيديوهات",
      "منسق حملات تسويقية",
      "خبير تجربة المستخدم",
      "Strategic Manager",
      "Account Manager",
      "Media Buyer",
      "Copywriter",
      "Content Creator",
      "Senior Graphic Designer",
      "Art Director",
      "SEO Specialist",
      "Marketing Data Analyst",
      "Social Media Manager",
      "Front-End Developer",
      "Marketing Automation Specialist",
      "Video Producer",
      "Campaign Coordinator",
      "UX Specialist",
      "Fast Growth Companies Marketing",
      "Digital Assets Management",
      "Maximize ROAS",
      "Digital Scaling Strategies",
      "Business Digital Transformation",
      "Scale Ads Management",
      "Strategic CRO",
      "Data-Driven Insights",
      "Digital Brand Engineering",
      "International SEO/SEM",
      "إدارة منصات التواصل الاجتماعي",
      "صناعة المحتوى الرقمي",
      "تحسين محركات البحث",
      "الحملات الإعلانية المدفوعة",
      "التسويق عبر المؤثرين",
      "تطوير الهوية البصرية",
      "تطوير وتصميم المواقع",
      "البريد الإلكتروني التسويقي",
      "إدارة السمعة الرقمية",
      "تخطيط الاستراتيجيات التسويقية",
      "تحليل البيانات والتقارير",
      "تصوير وإنتاج الفيديو",
      "إدارة الميزانيات الإعلانية",
      "كتابة المحتوى الإعلاني",
      "أتمتة العمليات التسويقية",
      "Social Media Management",
      "Digital Content Creation",
      "Search Engine Optimization",
      "Pay-Per-Click Advertising",
      "Influencer Marketing",
      "Visual Identity Development",
      "Web Design & Development",
      "Email Marketing",
      "Digital Reputation Management",
      "Marketing Strategy Planning",
      "Data Analysis & Reporting",
      "Video Production & Photography",
      "Ad Budget Management",
      "Copywriting",
      "Marketing Automation",
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

export default async function Solutions() {
  const locale = await getCurrentLocale();

  const [{ home }, solutions, news, project_details] = await Promise.all([
    getTrans(locale, "common"),
    getTrans(locale, "solutions"),
    getTrans(locale, "news"),
    getTrans(locale, "projectDetails"),
  ]);

  return (
    <>
      <PageBanner pageTitle={solutions.integrated_solutions} home={home} />

      <CoreSolutions solutions={solutions} locale={locale} />

      <WhatWeOffer
        solutions={solutions}
        project_details={project_details}
        locale={locale}
      />

      <AllSolutions solutions={solutions} locale={locale} news={news} />

      <OurCapabilities solutions={solutions} locale={locale} />
    </>
  );
}
