import AddNewBlock from "@/shared/components/blockControls/AddNewBlock";
import Box from "@/shared/ui/Box";
import { useFieldArray } from "react-hook-form";
import { useTranslation } from "react-i18next";
import type { ClientLogosFieldsProps } from "../../types";
import ClientLogoItemFields from "./ClientLogoItemFields";
import { LOGO_ITEM_INITIAL_STATE } from "./getClientsDefaultValues";

export default function ClientLogosFields({
  form,
  disabled,
}: ClientLogosFieldsProps) {
  const { t } = useTranslation();
  const { control } = form;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "logos",
  });

  return (
    <Box
      title={t("clients.logos_section")}
      className="flex flex-col gap-3 lg:gap-5"
    >
      <AddNewBlock
        count={fields.length}
        onAdd={() => append({ ...LOGO_ITEM_INITIAL_STATE })}
        managementLabel={t("clients.logo_management")}
        addLabel={t("clients.add_new_logo")}
      />

      <div className="grid grid-cols-1 gap-3 lg:gap-5 xl:grid-cols-2">
        {fields.map((field, index) => (
          <ClientLogoItemFields
            key={field.id}
            form={form}
            logoIndex={index}
            disabled={disabled}
            isDeleteDisabled={fields.length === 1}
            onRemove={() => remove(index)}
          />
        ))}
      </div>
    </Box>
  );
}
