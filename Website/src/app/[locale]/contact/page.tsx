import PageBanner from "@/components/common/pageBanner";
import Questions from "@/components/common/questions";
import ContactForm from "@/components/pages/contact/contactForm";
import LocationSection from "@/components/pages/contact/LocationSection";
import { getCurrentLocale } from "@/lib/getCurrentLocale";
import getTrans from "@/lib/translation";
import { Metadata } from "next";
import cairoImg from "../../../../public/images/contact/cairo.jpg";
import riyadhImg from "../../../../public/images/contact/riyadh.jpg";
import { LanguageType } from "@/i18n.config";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: LanguageType }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const [common, contact] = await Promise.all([
    getTrans(locale, "common"),
    getTrans(locale, "contact"),
  ]);

  const title = `${common.creation} | ${common.contact_us}`;

  const description = contact.seo_description;

  const currentUrl = `https://www.creation.sa/${locale}/contact`;
  const imageUrl = `https://www.creation.sa/images/home/creation-seo-${locale}-cover.jpg`;

  return {
    title,
    description,

    alternates: {
      canonical: currentUrl,
      languages: {
        ar: `https://www.creation.sa/ar/contact`,
        en: `https://www.creation.sa/en/contact`,
      },
    },

    keywords: [
      "Contact Us",
      "Get in Touch",
      "Production Company Contact",
      "Creative Production Services",
      "Media Production Agency",
      "Strategic Production Solutions",
      "Project Consultation",
      "Start Your Project",
      "Request a Quote",
      "Book a Consultation",
      "Schedule a Meeting",
      "Talk to Our Team",
      "Discuss Your Project",
      "Free Consultation",
      "Production Inquiry",
      "Full Project Lifecycle Support",
      "End-to-End Production",
      "Creative Strategy Experts",
      "Professional Production Team",
      "Custom Production Solutions",
      "Collaborative Production Process",
      "Marketing Agency Contact",
      "Digital Marketing Agency",
      "Full-Service Marketing Agency",
      "Creative Marketing Solutions",
      "Brand Strategy Agency",
      "Get a Free Consultation",
      "Request a Marketing Proposal",
      "Start Your Marketing Project",
      "Book a Strategy Session",
      "Talk to a Marketing Consultant",
      "Let’s Grow Your Brand",
      "Ready to Elevate Your Business?",
      "Partner With Marketing Experts",
      "Let’s Build Your Success Story",
      "لنصنع قصة نجاحك",
      "شريكك في النجاح التسويقي",
      "مستعد ترتقي بأعمالك؟",
      "لننمو بعلامتك التجارية",
      "اطلب عرض سعر",
      "تحدث مع مستشار تسويق",
      "احجز جلسة استراتيجية",
      "ابدأ مشروعك التسويقي",
      "اطلب عرض تسويقي",
      "احصل على استشارة مجانية",
      "تواصل مع وكالة تسويق",
      "حلول تسويق إبداعية",
      "وكالة تسويق متكاملة",
      "خبراء التسويق",
      "وكالة تسويق رقمي",
      "تواصل معنا",
      "معلومات الاتصال بشركة الإنتاج",
      "خدمات الإنتاج الإبداعي",
      "حلول إنتاج استراتيجية",
      "استشارات المشاريع",
      "ابدأ مشروعك",
      "احجز استشارة",
      "حدد موعدًا للاجتماع",
      "تحدث مع فريقنا",
      "ناقش مشروعك",
      "استشارة مجانية",
      "استفسار عن الإنتاج",
      "دعم شامل لدورة حياة المشروع",
      "إنتاج متكامل",
      "خبراء في الاستراتيجيات الإبداعية",
      "فريق إنتاج محترف",
      "حلول إنتاج مخصصة",
      "عملية إنتاج تعاونية",
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

export default async function ContactUs() {
  const locale = await getCurrentLocale();

  const [{ contact_us, home }, contact, form_errors, Faq] = await Promise.all([
    getTrans(locale, "common"),
    getTrans(locale, "contact"),
    getTrans(locale, "formErrors"),
    getTrans(locale, "faq"),
  ]);

  return (
    <>
      <PageBanner pageTitle={contact_us} home={home} />
      <ContactForm
        contact={contact}
        locale={locale}
        form_errors={form_errors}
      />

      <LocationSection
        title={contact.riyadh_title}
        address={contact.riyadh_description}
        phone={contact.riyadh_phone}
        email={contact.riyadh_email}
        image={riyadhImg}
      />

      <LocationSection
        title={contact.cairo_title}
        address={contact.cairo_description}
        phone={contact.cairo_phone}
        email={contact.cairo_email}
        image={cairoImg}
        reverse
      />
      <Questions faq={Faq} locale={locale} showCTA={false} />
    </>
  );
}
