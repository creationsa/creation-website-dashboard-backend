import CreationArLogo from "@/assets/CreationArLogo";
import CreationEnLogo from "@/assets/CreationEnLogo";
import { useLanguage } from "@/shared/hooks/useLanguage";
import ThemeToggle from "@/shared/ui/ThemeToggle";
import TranslateButton from "@/shared/ui/TranslateButton";
import LoginForm from "../components/loginForm";

export default function LoginPage() {
  const currentLanguage = useLanguage();

  return (
    <main className="flex min-h-screen">
      <section className="dark:bg-black-700 bg-white-300 flex w-full items-center justify-center p-4 lg:w-1/2">
        <div className="bg-white-200 dark:bg-black-800 dark:text-white-100 text-black-100 w-full max-w-md rounded-xl p-8 shadow-lg">
          <LoginForm />
        </div>
      </section>

      <section className="from-tiffany-200 to-white-300 dark:from-black-900 dark:to-black-800 relative hidden w-1/2 items-center justify-center bg-linear-to-br lg:flex">
        <div className="absolute inset-e-8 top-8 flex items-center gap-3">
          <TranslateButton />
          <ThemeToggle />
        </div>

        {currentLanguage === "en" ? (
          <CreationEnLogo className="text-black-800 dark:text-white-100 w-48 2xl:w-64" />
        ) : (
          <CreationArLogo className="text-black-800 dark:text-white-100 w-48 2xl:w-64" />
        )}
      </section>
    </main>
  );
}
