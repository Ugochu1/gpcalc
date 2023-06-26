import AuthProvider from "@/lib/contexts/AuthContext";
import "@/styles/globals.css";
import { NextPage } from "next";
import type { AppProps } from "next/app";
import { ReactElement, ReactNode } from "react";
import { Plus_Jakarta_Sans } from "next/font/google";

const plus_jarkata = Plus_Jakarta_Sans({ subsets: ["latin"] });

export type NextPageWithLayout<P = {}> = NextPage<P> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

export type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <main className={plus_jarkata.className}>
      {/* <AuthProvider>{getLayout(<Component {...pageProps} />)}</AuthProvider> */}
      {getLayout(<Component {...pageProps} />)}
    </main>
  );
}
