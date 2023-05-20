"use client";

import { Button, ButtonProps } from "@chakra-ui/react";
import { Providers } from "./Providers";

interface Props extends ButtonProps {}

const ChakraButton = (props: Props) => {
  return (
    <Providers>
      <Button fontWeight={"normal"} {...props} />
    </Providers>
  );
};

export default ChakraButton;
