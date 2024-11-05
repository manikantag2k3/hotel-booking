import  { useEffect } from "react";

type ToastProps = {
  message: string;
  type: "SUCCESS" | "ERROR";
  onClose: () => void;
};

const Toast = ({ message, type, onClose }: ToastProps) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      document.querySelector(".toast")?.classList.add("hidden");
      onClose(); // Call onClose to remove the toast from the state
    }, 5000);
    return () => clearTimeout(timeout);
  }, [onClose]);

  const styles =
    type === "SUCCESS"
      ? "toast fixed top-4 right-4 z-50 p-4 rounded-md bg-green-600 text-white max-w-md"
      : "toast fixed top-4 right-4 z-50 p-4 rounded-md bg-red-600 text-white max-w-md";

  return (
    <div className={styles}>
      <div className="flex justify-center items-center">
        <span className="text-lg font-semibold">{message}</span>
      </div>
    </div>
  );
};

export default Toast;
