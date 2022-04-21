import type { AppProps } from "next/app";
import MainLayout from "../components/layouts/MainLayout";
import "../styles/globals.css";

function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <MainLayout router={router}>
      <Component {...pageProps} />
    </MainLayout>
  );
}

export default MyApp;
