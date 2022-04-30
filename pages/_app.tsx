import { useEffect, useState } from "react";
import "../styles/globals.css";
import NextNProgress from "nextjs-progressbar";
import type { AppProps } from "next/app";
import { wrapper } from "../src/redux/store";
import Theme, { theme } from "src/Theme";
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <NextNProgress
        color={theme.colors.white2}
        startPosition={0.3}
        stopDelayMs={200}
        height={3}
        showOnShallow={true}
      />
      <Theme>
        <Component {...pageProps} />
      </Theme>
    </>
  );
}

export default wrapper.withRedux(MyApp);
