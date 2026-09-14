import AddNewBlock from "@/shared/components/blockControls/AddNewBlock";
import BlockHeader from "@/shared/components/blockControls/BlockHeader";
import Box from "@/shared/ui/Box";
import Input from "@/shared/ui/textField/Input";
import { useFieldArray } from "react-hook-form";
import { useTranslation } from "react-i18next";
import type { SectionProps } from "../../types";
import { SOCIAL_ITEM_INITIAL_STATE } from "./getSettingsDefaultValues";

export default function SettingsSocialsFields({
  form,
  disabled,
}: SectionProps) {
  const { t } = useTranslation();

  const {
    register,
    control,
    formState: { errors },
  } = form;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "socials",
  });

  return (
    <Box
      title={t("settings.socials")}
      className="flex flex-col gap-3 lg:gap-5"
    >
      <AddNewBlock
        count={fields.length}
        onAdd={() => append({ ...SOCIAL_ITEM_INITIAL_STATE })}
        managementLabel={t("settings.social_link_management")}
        addLabel={t("settings.add_new_social")}
      />

      <div className="flex flex-col gap-4">
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="relative flex flex-col gap-3 rounded-xl border p-4 lg:gap-5"
          >
            <BlockHeader
              rowLabel={t("settings.social_link_row", { index: index + 1 })}
              onRemove={() => remove(index)}
              isDeleteDisabled={fields.length === 1}
            />

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Input
                name={`socials.${index}.title_en`}
                label={t("general.title_en")}
                error={errors.socials?.[index]?.title_en?.message}
                register={register(`socials.${index}.title_en`)}
                disabled={disabled}
              />

              <Input
                name={`socials.${index}.title_ar`}
                label={t("general.title_ar")}
                error={errors.socials?.[index]?.title_ar?.message}
                register={register(`socials.${index}.title_ar`)}
                disabled={disabled}
              />

              <div className="md:col-span-2">
                <Input
                  name={`socials.${index}.link`}
                  label={t("general.link")}
                  error={errors.socials?.[index]?.link?.message}
                  register={register(`socials.${index}.link`)}
                  disabled={disabled}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </Box>
  );
}
