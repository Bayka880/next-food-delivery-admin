import "../styles/globals.css";
import type { AppProps } from "next/app";
import type { NextPage } from "next";
import { ReactElement, ReactNode, useEffect, useState } from "react";
import Navbar from "../components/navbar";
import { useRouter } from "next/router";
import Login from "./login";
import Layout from "./Layout";
export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};
type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};
interface Profile {
  address: String;
  email: String;
  firsName: String;
  phoneNumber: String;
  token: String;
}
function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);
  const router = useRouter();
  const [user, setUser] = useState<Profile[]>([]);
  console.log(user.length !== 0);
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user") || "[]"));
  }, []);

  return getLayout(
    <>
      {user.length !== 0 ? (
        <Layout>
          <Component {...pageProps} />
        </Layout>
      ) : (
        <Login />
      )}
    </>
  );
}

export default MyApp;
