// _app.js
import React from "react";
import Head from "next/head";
import { Toaster } from "react-hot-toast";
import "firebase/auth";

import { Layout } from "../components";
import "../styles/globals.css";
import { StateContext } from "../context/StateContext";
import { AuthProvider } from "../lib/firebase/auth"; // Correct the path to your auth file

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <StateContext>
        <Head>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Layout>
          <Toaster />
          <Component {...pageProps} />
        </Layout>
      </StateContext>
    </AuthProvider>
  );
}

export default MyApp;
