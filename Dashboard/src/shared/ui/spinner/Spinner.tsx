import styles from "./Spinner.module.css";

const spinnerSizes = {
  md: "h-[50vh]",
  lg: "h-[100vh] min-h-full",
};

interface SpinnerProps {
  size?: keyof typeof spinnerSizes;
}

export default function Spinner({ size = "md" }: SpinnerProps) {
  return (
    <div
      className={`flex items-center justify-center bg-transparent backdrop-blur-xs ${spinnerSizes[size]}`}
    >
      <div className={`${styles.loader}`} />
    </div>
  );
}
