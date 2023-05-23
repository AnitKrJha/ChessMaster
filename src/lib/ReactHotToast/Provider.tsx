"use client";
import { Toast, Toaster } from "react-hot-toast";

const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      {children}
    </>
  );
};

export default ToastProvider;
