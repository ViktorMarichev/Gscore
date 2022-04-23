import { useEffect, useState } from "react";
import "../styles/globals.css";
import { Provider } from "react-redux";
import type { AppProps, AppContext } from "next/app";
import withRedux from "next-redux-wrapper";
import { wrapper } from "../src/redux/store";
import { GetServerSideProps } from "next";
function MyApp({ Component, pageProps }: AppProps) {
  /*const [showChild, setShowChild] = useState(false);
  useEffect(() => {
    setShowChild(true);
  }, []);
  if (!showChild) {
    return null;
  }*/

  return <Component {...pageProps} />;
}

export default wrapper.withRedux(MyApp);
