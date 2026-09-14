import { useTranslation } from "react-i18next";
import Box from "../ui/Box";

export default function LogoHint() {
  const { t } = useTranslation();

  return (
    <Box className="dark:bg-black-700 bg-white-300 flex flex-col gap-3 lg:gap-5">
      <p className="text-sm text-gray-500">{t("header.logo_hint")}</p>
    </Box>
  );
}
