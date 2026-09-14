import Button from "@/shared/ui/Button";
import { useTranslation } from "react-i18next";
import type { ClientsFormProps } from "../../types";
import ClientLogosFields from "./ClientLogosFields";
import ClientTitleFields from "./ClientTitleFields";
import useClientsForm from "./useClientsForm";

export default function ClientsForm({ clientsData }: ClientsFormProps) {
  const { t } = useTranslation();
  const { form, isLoading, handleUpdateClients } = useClientsForm(clientsData);

  const {
    formState: { isDirty, isValid },
  } = form;

  const isSubmitDisabled = isLoading || !isValid || !isDirty;

  return (
    <form
      onSubmit={form.handleSubmit(handleUpdateClients)}
      className="flex flex-col gap-6"
    >
      <ClientTitleFields form={form} disabled={isLoading} />

      <ClientLogosFields form={form} disabled={isLoading} />

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
