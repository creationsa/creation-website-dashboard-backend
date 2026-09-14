import PageTitle from "@/shared/ui/PageTitle";
import Spinner from "@/shared/ui/spinner/Spinner";
import { useTranslation } from "react-i18next";
import ClientsForm from "../components/clientsForm";
import { useClients } from "../hooks/useClients";

export default function Clients() {
  const { t } = useTranslation();
  const { clientsData, isClientsLoading } = useClients();

  if (isClientsLoading) return <Spinner size="lg" />;

  return (
    <>
      <PageTitle title={t("clients.clients")} />

      <ClientsForm clientsData={clientsData} />
    </>
  );
}
