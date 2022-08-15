import "../styles/globals.css";
import type { AppProps } from "next/app";
import type { NextPage } from "next";
import { ReactElement, ReactNode, useEffect } from "react";
import Navbar from "../components/navbar";
import { useRouter } from "next/router";
export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};
type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};
function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);
  const router = useRouter();
  useEffect(() => {
    const userInfo =
      localStorage.getItem("user") !== "undefined"
        ? localStorage.getItem("user") || ""
        : null;

    if (router.pathname !== "/login" && !userInfo) {
      router.push("/login");
    }
  }, []);
  return getLayout(
    <>
      <Navbar />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
