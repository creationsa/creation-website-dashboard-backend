import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import Button from "@/shared/ui/Button";

export default function PageNotFound() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 text-center">
      <p className="text-8xl font-bold opacity-20">404</p>
      <h1 className="text-2xl font-semibold">{t("general.pageNotFound")}</h1>
      <Button className="w-fit!" onClick={() => navigate("/blogs")}>
        {t("general.backToDashboard")}
      </Button>
    </div>
  );
}
