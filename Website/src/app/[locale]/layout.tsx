import Footer from "@/components/layout/footer";
import Navbar from "@/components/layout/navbar";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Directions, Languages } from "@/constants/enums";
import { LanguageType } from "@/i18n.config";
import { getSeoForPage } from "@/lib/api/getSeoForPage";
import type { Metadata } from "next";
import localFont from "next/font/local";
import Script from "next/script";
import { parseKeywords } from "../../../utils/parseKeywords";
import "./globals.css";

const myHeadingFont = localFont({
  src: "../../../public/fonts/thmanyahserifdisplay-Medium.woff2",
  variable: "--font-my-heading",
  display: "swap",
});

const myTextFont = localFont({
  src: "../../../public/fonts/thmanyahseriftext-Regular.woff2",
  variable: "--font-text",
  display: "swap",
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: LanguageType }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const seoData = await getSeoForPage("home", locale);

  const { title, description, image, image_alt, image_type } = seoData;

  const keywords = parseKeywords(seoData.keywords);

  const currentUrl = `https://www.creation.sa/${locale}`;

  return {
    title,
    description,

    icons: {
      icon: "/icon.png",
      shortcut: "/icon.png",
      apple: "/icon.png",
    },

    alternates: {
      canonical: currentUrl,
      languages: {
        ar: `https://www.creation.sa/ar`,
        en: `https://www.creation.sa/en`,
      },
    },

    authors: [{ name: "Creation" }],

    keywords,

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

export async function generateStaticParams() {
  return [{ locale: Languages.ARABIC }, { locale: Languages.ENGLISH }];
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;

  return (
    <html
      lang={locale}
      dir={locale === Languages.ARABIC ? Directions.RTL : Directions.LTR}
      className={`${myHeadingFont.variable} ${myTextFont.variable} overflow-x-hidden`}
      suppressHydrationWarning
    >
      <body className="dark:bg-black-800 dark:text-white-100 bg-white-200 text-black-100 font-text flex min-h-screen flex-col antialiased">
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="dark"
          enableSystem={false}
        >
          <Navbar />
          <main className="mb-[130px] flex flex-1 flex-col gap-20">
            {children}
          </main>
          <Footer />

          <Script
            src="https://www.googletagmanager.com/gtag/js?id=G-0ESPCDTWXN"
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', 'G-0ESPCDTWXN');
            `}
          </Script>
        </ThemeProvider>
      </body>
    </html>
  );
}
