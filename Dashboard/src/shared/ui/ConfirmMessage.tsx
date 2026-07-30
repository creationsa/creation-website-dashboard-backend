import { useTranslation } from "react-i18next";
import Button from "./Button";

interface ConfirmMessageProps {
  onConfirm: () => void;
  message: string;
  disabled?: boolean;
  onCloseModal?: () => void;
}

export default function ConfirmMessage({
  onConfirm,
  message,
  disabled,
  onCloseModal,
}: ConfirmMessageProps) {
  const { t } = useTranslation();

  const handleConfirm = () => {
    onConfirm();
    onCloseModal?.();
  };

  return (
    <>
      <p className="w-[95%] p-3.5 text-xl font-semibold capitalize md:p-5">
        {message}
      </p>

      <div className="dark:bg-black-700 bg-white-300 border-t p-4">
        <div className="flex gap-2">
          <Button
            variation="secondary"
            disabled={disabled}
            onClick={onCloseModal}
            aria-label={t("general.cancel")}
          >
            {t("general.cancel")}
          </Button>
          <Button
            variation="delete"
            disabled={disabled}
            onClick={handleConfirm}
            aria-label={t("general.yes")}
          >
            {t("general.yes")}
          </Button>
        </div>
      </div>
    </>
  );
}
