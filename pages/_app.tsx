import { useEffect, useState } from "react";
import "../styles/globals.css";
import NextNProgress from "nextjs-progressbar";
import type { AppProps } from "next/app";
import { wrapper } from "../src/redux/store";
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <NextNProgress
        color="#fdfdfd"
        startPosition={0.3}
        stopDelayMs={200}
        height={3}
        showOnShallow={true}
      />
      <Component {...pageProps} />
    </>
  );
}

export default wrapper.withRedux(MyApp);
