import { useTranslation } from "react-i18next";

export default function TranslateButton() {
  const { i18n } = useTranslation();

  const changeLanguage = () => {
    const newLanguage = i18n.language === "en" ? "ar" : "en";

    i18n.changeLanguage(newLanguage);
  };

  return (
    <button
      onClick={changeLanguage}
      className="hover:text-tiffany-600 dark:hover:text-tiffany-100 dark:text-white-100 text-black-100 flex items-center gap-0.5 text-sm font-semibold sm:text-base"
    >
      {i18n.language === "en" ? "العربية" : "English"}
    </button>
  );
}
