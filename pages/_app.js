// _app.js
import React from "react";
import Head from "next/head";
import { Toaster } from "react-hot-toast";
import { LoadingProvider } from "../context/LoadingContext"; // Import LoadingProvider
import { Layout} from "../components"; // Import Loading component
import Loading from "./Loading";
import "../styles/globals.css";
import { StateContext } from "../context/StateContext";
import { AuthProvider } from "../lib/firebase/auth";

function MyApp({ Component, pageProps }) {
  return (
    <StateContext>
      <AuthProvider>
        <LoadingProvider> {/* Wrap your app with LoadingProvider */}
          <Head>
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <Layout>
            <Loading /> {/* Include the Loading component */}
            <Toaster />
            <Component {...pageProps} />
          </Layout>
        </LoadingProvider>
      </AuthProvider>
    </StateContext>
  );
}

export default MyApp;
