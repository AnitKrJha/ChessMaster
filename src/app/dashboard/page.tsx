"use client";

import React from "react";
import Profile from "@/components/Dashboard/Profile";
import CreateRoom from "@/components/Dashboard/CreateRoom";
import PastGames from "@/components/Dashboard/pastgames";

type Props = {};

const DashboardPage = (props: Props) => {
  return (
    <div className="max-w-5xl w-full">
      <div className="w-full flex gap-4 flex-col md:flex-row items-start">
        <Profile />
        <CreateRoom />
      </div>
      <PastGames />
    </div>
  );
};

export default DashboardPage;
