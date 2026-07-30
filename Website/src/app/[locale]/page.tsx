import Network from "@/components/common/network";
import News from "@/components/common/news";
import About from "@/components/pages/home/about";
import Architecture from "@/components/pages/home/architecture";
import Banner from "@/components/pages/home/banner";
import Blogs from "@/components/pages/home/blogs";
import { getHomeBlogs } from "@/components/pages/home/blogs/getHomeBlogs";
import Projects from "@/components/pages/home/projects";
import Reviews from "@/components/pages/home/reviews";
import Solutions from "@/components/pages/home/solutions";
import { getCurrentLocale } from "@/lib/getCurrentLocale";
import getTrans from "@/lib/translation";

export default async function Home() {
  const locale = await getCurrentLocale();
  const [
    banner,
    network,
    about,
    news,
    reviews,
    blogs,
    project,
    solutions,
    architecture,
    project_details,
    all_blogs,
  ] = await Promise.all([
    getTrans(locale, "banner"),
    getTrans(locale, "network"),
    getTrans(locale, "about"),
    getTrans(locale, "news"),
    getTrans(locale, "reviews"),
    getTrans(locale, "blogs"),
    getTrans(locale, "project"),
    getTrans(locale, "solutions"),
    getTrans(locale, "architecture"),
    getTrans(locale, "projectDetails"),
    getHomeBlogs(locale),
  ]);

  return (
    <>
      <Banner banner={banner} locale={locale} />
      <Network network={network} />
      <About about={about} locale={locale} />
      <Solutions
        solutions={solutions}
        project_details={project_details}
        locale={locale}
      />
      <Architecture architecture={architecture} locale={locale} />
      <News data={news.home_news_title} noBackground />
      <Projects
        project={project}
        project_details={project_details}
        locale={locale}
      />
      <Reviews reviews={reviews} locale={locale} />
      <Blogs all_blogs={all_blogs} blogs={blogs} locale={locale} />
    </>
  );
}
