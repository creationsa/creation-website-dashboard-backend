import BackgroundImageMainSection from "@/components/common/backgroundImageMainSection";
import Insights from "@/components/common/blogsCategories/Insights";
import Strategies from "@/components/common/blogsCategories/Strategies";
import PageBanner from "@/components/common/pageBanner";
import { getBlogBySlug } from "@/components/pages/blogsDetails/getBlogBySlug";
import { getBlogSlugs } from "@/components/pages/blogsDetails/getBlogSlugs";
import NextTwoBlogs from "@/components/pages/blogsDetails/NextTwoBlogs";
import { BlogDetailsProps } from "@/components/pages/blogsDetails/types";
import { Languages } from "@/constants/enums";
import { getSeoForPage } from "@/lib/api/getSeoForPage";
import getTrans from "@/lib/translation";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: BlogDetailsProps): Promise<Metadata> {
  const { slug, locale } = await params;

  const [{ site_name }, blogData] = await Promise.all([
    getSeoForPage("home", locale),
    getBlogBySlug(slug, locale),
  ]);

  const title = `${site_name} | ${blogData?.title}`;
  const description = blogData?.seo_desc;
  const currentUrl = `https://www.creation.sa/${locale}/blogs/${slug}`;

  const image = blogData?.base_image;

  return {
    title,
    description,

    alternates: {
      canonical: currentUrl,
      languages: {
        ar: `https://www.creation.sa/ar/blogs/${slug}`,
        en: `https://www.creation.sa/en/blogs/${slug}`,
      },
    },

    openGraph: {
      type: "website",
      title,
      description,
      url: currentUrl,

      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: blogData?.base_image_object?.[locale]?.alt,
          type: "image/png",
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

export async function generateStaticParams() {
  const slugs = await getBlogSlugs(Languages.ENGLISH);

  return slugs.flatMap((blog) => [
    {
      locale: Languages.ARABIC,
      slug: blog.slug_en,
    },
    {
      locale: Languages.ENGLISH,
      slug: blog.slug_en,
    },
  ]);
}

export default async function BlogsDetails({ params }: BlogDetailsProps) {
  const { slug, locale } = await params;

  const [{ home }, blogs, blogData] = await Promise.all([
    getTrans(locale, "common"),
    getTrans(locale, "blogs"),
    getBlogBySlug(slug, locale),
  ]);

  if (!blogData) {
    return notFound();
  }
  return (
    <>
      <PageBanner pageTitle={blogData.title} home={home} />

      <BackgroundImageMainSection
        certainImage={blogData.cover_image}
        alt={blogData.cover_image_object?.[locale]?.alt}
      />

      <Insights thinking={blogs} blogData={blogData} locale={locale} />

      <Strategies thinking={blogs} blogData={blogData} locale={locale} />

      <NextTwoBlogs
        locale={locale}
        relatedBlogs={blogData.related_blogs}
        thinking={blogs}
      />
    </>
  );
}
