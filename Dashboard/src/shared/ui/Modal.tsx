import {
  cloneElement,
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactElement,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { useTranslation } from "react-i18next";
import { CloseIcon } from "../icons";

interface ModalContextType {
  openName: string;
  close: () => void;
  open: (windowName: string) => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

interface ModalProps {
  children: ReactNode;
}

function Modal({ children }: ModalProps) {
  const [openName, setOpenName] = useState<string>("");
  const close = () => setOpenName("");
  const open = (windowName: string) => setOpenName(windowName);

  return (
    <ModalContext.Provider value={{ openName, close, open }}>
      {children}
    </ModalContext.Provider>
  );
}
interface OpenChildProps {
  onClick?: () => void;
}

interface OpenProps {
  opens: string;
  children: ReactElement<OpenChildProps>;
}

function Open({ opens: opensWindowName, children }: OpenProps) {
  const context = useContext(ModalContext);
  if (!context) throw new Error("Open must be used within a Modal");

  const { open } = context;
  return cloneElement(children, { onClick: () => open(opensWindowName) });
}

interface WindowChildProps {
  onCloseModal?: () => void;
}

interface WindowProps {
  children: ReactElement<WindowChildProps>;
  name: string;
  style?: string;
}

function Window({ children, name, style }: WindowProps) {
  const context = useContext(ModalContext);
  if (!context) throw new Error("Window must be used within a Modal");
  const { t } = useTranslation();

  const { openName, close } = context;

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        close();
      }
    };

    if (name === openName) {
      document.addEventListener("keydown", handleEsc);
    }

    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [name, openName, close]);

  if (name !== openName) return null;

  return createPortal(
    <div>
      <div className="dark:bg-black-800/85 bg-white-200/60 fixed top-0 left-0 z-110 h-full w-full backdrop-blur-xs" />

      <div className="fixed top-0 left-0 z-1000 h-full w-full">
        <div
          className={`bg-white-200 dark:bg-black-800 dark:text-white-100 text-black-100 fixed top-[50%] left-[50%] z-50 max-h-[80vh] w-[90%] translate-x-[-50%] translate-y-[-50%] overflow-hidden rounded-xl shadow-md md:w-187.5 ${style}`}
        >
          <button
            aria-label={t("general.close")}
            title={t("general.close")}
            onClick={close}
            className="absolute inset-e-2.5 top-2.5 text-red-400 dark:text-red-500"
          >
            <CloseIcon />
          </button>
          <div>{cloneElement(children, { onCloseModal: close })}</div>
        </div>
      </div>
    </div>,
    document.body,
  );
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
