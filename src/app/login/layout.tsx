import React from "react";

type Props = {
  children: React.ReactNode;
};

const LoginPageLayout = ({ children }: Props) => {
  return (
    <main
      className={`w-full px-4 pt-4 pb-8 sm:pt-16 min-h-[calc(100dvh_-_64px)] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] text-white from-gray-700 via-gray-900 to-black `}
    >
      <div className="wrapper max-w-2xl px-4 m-auto border rounded border-gray-500">
        {children}
      </div>
    </main>
  );
};

export default LoginPageLayout;
