import Button from "@/shared/ui/Button";
import SelectField from "@/shared/ui/selectField";
import Input from "@/shared/ui/textField/Input";
import { useMemo } from "react";
import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import type { ProfileFormProps } from "../../types";
import { useProfileForm } from "./useProfileForm";

export default function ProfileForm({ profile }: ProfileFormProps) {
  const { t } = useTranslation();
  const { form, onSubmit, isUpdateProfileLoading } = useProfileForm(profile);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isDirty, isValid },
  } = form;

  const genderOptions = useMemo(
    () => [
      { label: t("auth.gender_male"), value: "male" },
      { label: t("auth.gender_female"), value: "female" },
    ],
    [t],
  );

  const isSubmitDisabled = isUpdateProfileLoading || !isValid || !isDirty;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-3 lg:gap-5"
    >
      <Input
        name="full_name"
        label={t("auth.full_name")}
        register={register("full_name")}
        error={errors.full_name?.message}
        disabled={isUpdateProfileLoading}
      />

      <Input
        name="email"
        type="email"
        label={t("auth.email")}
        register={register("email")}
        error={errors.email?.message}
        disabled={isUpdateProfileLoading}
      />

      <div className="flex gap-3 lg:gap-5">
        <div className="w-28 shrink-0">
          <Input
            name="phone_code"
            label={t("auth.phone_code")}
            register={register("phone_code")}
            error={errors.phone_code?.message}
            disabled={isUpdateProfileLoading}
            placeholder="+966"
          />
        </div>
        <div className="flex-1">
          <Input
            name="phone"
            label={t("auth.phone")}
            register={register("phone")}
            error={errors.phone?.message}
            disabled={isUpdateProfileLoading}
          />
        </div>
      </div>

      <Controller
        name="gender"
        control={control}
        render={({ field }) => (
          <SelectField
            name="gender"
            label={t("auth.gender")}
            options={genderOptions}
            value={field.value}
            onChange={(val) => field.onChange(val)}
            error={errors.gender?.message}
            disabled={isUpdateProfileLoading}
          />
        )}
      />

      <Button
        type="submit"
        className="ms-auto block w-full sm:w-44"
        loading={isUpdateProfileLoading}
        disabled={isSubmitDisabled}
      >
        {t("general.update")}
      </Button>
    </form>
  );
}
