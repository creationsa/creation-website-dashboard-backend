"use client";

import AppButton from "@/components/ui/AppButton";
import { useParams } from "next/navigation";

const COPY = {
  en: {
    title: "Something Went Wrong",
    description:
      "An unexpected error occurred while loading this page. Please try again, or head back home.",
    retry: "Try Again",
    home: "Back to Home",
  },
  ar: {
    title: "عذرًا، حدث خطأ ما",
    description:
      "حدث خطأ غير متوقع أثناء تحميل هذه الصفحة. برجاء المحاولة مرة أخرى، أو العودة للصفحة الرئيسية.",
    retry: "إعادة المحاولة",
    home: "العودة للرئيسية",
  },
} as const;

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const params = useParams<{ locale: string }>();
  const copy = params.locale === "ar" ? COPY.ar : COPY.en;


  return (
    <section className="container mt-20 flex flex-col items-center justify-center text-center">
      <h1 className="text-8xl font-bold">!</h1>

      <h2 className="font-head font-fancy uppercase">{copy.title}</h2>

      <p className="mt-4 mb-8 text-gray-600 dark:text-gray-500">
        {copy.description}
      </p>

      <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
        <AppButton onClick={reset} label={copy.retry}>
          {copy.retry}
        </AppButton>
        <AppButton href={`/${params.locale}`} label={copy.home} replace>
          {copy.home}
        </AppButton>
      </div>
    </section>
  );
}
