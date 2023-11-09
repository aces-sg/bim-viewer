// import "@/styles/globals.css";
import "@/styles/app.css";
import { Amplify, Auth } from "aws-amplify";
import type { AppProps } from "next/app";
import config from "@/aws-exports";

Amplify.configure({
  ...config,
  ssr: true,
});

import Layout from "@/components/layout";
import { useEffect } from "react";

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    let res = Auth.currentAuthenticatedUser();
    console.log("user is", res);
  });
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
