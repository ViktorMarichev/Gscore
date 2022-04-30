import React from "react";
import { ThemeProvider } from "styled-components";

 export const theme = {
  colors: {
    redOrange: "#FC5842",
    darkScarlet: "#D1311C",
    snowWhite: "#FFF0EE",
    snowWhite2: "#FFEFF0",
    graphiteBlack: "#181818",
    signalBlack: "#272727",
    grayBrown: "#393939",
    pearlLightGray: "#969696",
    silver: "#C7C7C7",
    lightGray: "#D7D7D7",
    white: "#FFFFFF",
    white2: "#FBFBFB",
    jade: "#05C168",
    strawberryRed: "#DC2B2B",
    orangeDawn: "#FF5A65",
    lightPink: "#FFBEC2",
    luminousBrightOrange: "#FF9E2C",
  },
};

const Theme = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

export default Theme;
