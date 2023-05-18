"use client";

import React from "react";
import { RecoilRoot } from "recoil";

type Props = {
  children: React.ReactNode;
};

const RecoilProviders = (props: Props) => {
  return <RecoilRoot>{props.children}</RecoilRoot>;
};

export default RecoilProviders;
