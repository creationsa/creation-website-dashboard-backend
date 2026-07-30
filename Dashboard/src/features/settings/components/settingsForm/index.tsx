import Button from "@/shared/ui/Button";
import { useTranslation } from "react-i18next";
import type { SettingsFormProps } from "../../types";
import useSettingsForm from "./useSettingsForm";
import SocialMediaFields from "./SocialMediaFields";
import Logo from "./Logo";

const SOCIALS = ["instagram", "facebook", "behance", "linkedin"] as const;

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

      {SOCIALS.map((social) => (
        <SocialMediaFields
          key={social}
          form={form}
          prefix={social}
          disabled={isLoading}
        />
      ))}

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
