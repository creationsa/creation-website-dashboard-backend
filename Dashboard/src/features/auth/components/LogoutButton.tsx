import Button from "@/shared/ui/Button";
import ConfirmMessage from "@/shared/ui/ConfirmMessage";
import Modal from "@/shared/ui/Modal";
import { useTranslation } from "react-i18next";
import { useLogout } from "../hooks/useLogout";
import { LogoutIcon } from "@/shared/icons";

export default function LogoutButton() {
  const { t } = useTranslation();

  const { submitLogout, isLogoutLoading } = useLogout();

  const action = () => {
    submitLogout();
  };

  return (
    <Modal>
      <Modal.Open opens="logout">
        <Button
          variation="delete"
          size="actions"
          aria-label={t("auth.signout")}
          title={t("auth.signout")}
        >
          <LogoutIcon className="size-4 sm:size-6 rtl:rotate-180" />
        </Button>
      </Modal.Open>

      <Modal.Window name="logout">
        <ConfirmMessage
          disabled={isLogoutLoading}
          message={t("auth.signout_confirmation")}
          onConfirm={() => action()}
        />
      </Modal.Window>
    </Modal>
  );
}
