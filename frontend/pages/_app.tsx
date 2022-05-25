import type { AppProps } from "next/app";
import React from "react";
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
