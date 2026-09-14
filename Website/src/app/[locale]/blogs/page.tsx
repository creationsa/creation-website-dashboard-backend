import BlogsCategories from "@/components/common/blogsCategories";
import PageBanner from "@/components/common/pageBanner";
import { getBlogs } from "@/components/pages/blogs/getBlogs";
import { BlogsPageProps } from "@/components/pages/blogs/types";
import { LanguageType } from "@/i18n.config";
import { getSeoForPage } from "@/lib/api/getSeoForPage";
import getTrans from "@/lib/translation";
import { Metadata } from "next";
import { parseKeywords } from "../../../../utils/parseKeywords";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: LanguageType }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const [{ site_name }, seoData] = await Promise.all([
    getSeoForPage("home", locale),
    getSeoForPage("blogs", locale),
  ]);

  const {
    title: seoTitle,
    description,
    image,
    image_alt,
    image_type,
  } = seoData;

  const title = `${site_name} | ${seoTitle}`;

  const keywords = seoData.keywords
    ? parseKeywords(seoData.keywords)
    : undefined;

  const currentUrl = `https://www.creation.sa/${locale}/blogs`;

  return {
    title,
    description,

    alternates: {
      canonical: currentUrl,
      languages: {
        ar: `https://www.creation.sa/ar/blogs`,
        en: `https://www.creation.sa/en/blogs`,
      },
    },

    ...(keywords?.length && {
      keywords,
    }),

    openGraph: {
      type: "website",
      url: currentUrl,
      title,
      description,

      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: image_alt,
          type: image_type || "image/jpeg",
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      site: currentUrl,
    },
  };
}

export default async function Blogs({ params }: BlogsPageProps) {
  const { locale } = await params;

  const [{ home }, blogs, blogsData] = await Promise.all([
    getTrans(locale, "common"),
    getTrans(locale, "blogs"),
    getBlogs(locale),
  ]);

  return (
    <>
      <PageBanner pageTitle={blogs.header_title} home={home} />

      <section className="container">
        {/* Blogs Grid */}
        <BlogsCategories
          blogsTranslation={blogs}
          bigBottomPadding
          locale={locale}
          allBlogsData={blogsData}
        />
      </section>
    </>
  );
}
