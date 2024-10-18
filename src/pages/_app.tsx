import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Matheus Souza</title>
        <link rel="icon" href="/mhs_logo-ico.ico" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
