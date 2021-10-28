import { ChakraProvider, ColorModeScript, extendTheme, ThemeConfig } from "@chakra-ui/react";
import * as React from "react";
import ReactDOM from "react-dom";
import { App } from "./App";

const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

ReactDOM.render(
  <ChakraProvider theme={extendTheme({ config })}>
    <ColorModeScript />
    <App />
  </ChakraProvider>,
  document.getElementById("root")
);
