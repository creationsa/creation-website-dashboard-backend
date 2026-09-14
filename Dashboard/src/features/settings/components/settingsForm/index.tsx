import Button from "@/shared/ui/Button";
import { useTranslation } from "react-i18next";
import type { SettingsFormProps } from "../../types";
import Logo from "./Logo";
import SettingsSocialsFields from "./SettingsSocialsFields";
import useSettingsForm from "./useSettingsForm";

export default function SettingsForm({ settings }: SettingsFormProps) {
  const { t } = useTranslation();

  const { form, isLoading, handleUpdateSettings } = useSettingsForm(settings);

  const {
    formState: { isDirty, isValid },
  } = form;

  const isSubmitDisabled = isLoading || !isValid || !isDirty;

  return (
    <form
      onSubmit={form.handleSubmit(handleUpdateSettings)}
      className="flex flex-col gap-6"
    >
      <Logo form={form} disabled={isLoading} />

      <SettingsSocialsFields form={form} disabled={isLoading} />

      <Button
        type="submit"
        className="ms-auto mt-6 w-full sm:w-44"
        loading={isLoading}
        disabled={isSubmitDisabled}
      >
        {t("general.update")}
      </Button>
    </form>
  );
}
