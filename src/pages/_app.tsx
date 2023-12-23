// import "@/styles/globals.css";
import "@/styles/app.css";
import type { AppProps } from "next/app";
import Layout from "@/components/layout";
import { AuthProvider } from "@/components/Auth/authContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthProvider>
  );
}
