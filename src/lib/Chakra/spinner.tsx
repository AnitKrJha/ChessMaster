"use client";

import { Spinner, SpinnerProps } from "@chakra-ui/react";

import React from "react";

interface Props extends SpinnerProps {}

const ChakraSpinner = (props: Props) => {
  return <Spinner {...props} />;
};

export default ChakraSpinner;
