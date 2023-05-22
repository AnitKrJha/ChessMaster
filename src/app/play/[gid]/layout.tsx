import React from "react";

type Props = {
  children: React.ReactNode;
};

const PlayGameLayout = ({ children }: Props) => {
  return (
    <main
      className={`max w-full  px-4 pt-4 pb-8 sm:pt-6 min-h-[calc(100dvh_-_64px)] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] text-white from-gray-700 via-gray-900 to-black `}
    >
      <div className="wrapper py-3  max-w-5xl px-4 m-auto  rounded b">
        {children}
      </div>
    </main>
  );
};

export default PlayGameLayout;
