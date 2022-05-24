import type { AppProps } from "next/app";
import React from "react";
import MainLayout from "../components/layouts/MainLayout";
import "../styles/globals.css";

export const UserContext = React.createContext<null>(null);

function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <UserContext.Provider value={null}>
      <MainLayout router={router}>
        <Component {...pageProps} />
      </MainLayout>
    </UserContext.Provider>
  );
}

export default MyApp;
