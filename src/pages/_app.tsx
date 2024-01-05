// import "@/styles/globals.css";
import "@/styles/app.css";
import type { AppProps } from "next/app";
import Layout from "@/components/layout";
import { AuthProvider } from "@/components/Auth/authContext";
import { GoogleTagManager } from "@next/third-parties/google";
import { DefaultSeo } from "next-seo";
import SEO from "../../next-seo.config";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <DefaultSeo {...SEO} />
      <AuthProvider>
        <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM || ""} />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AuthProvider>
    </>
  );
}
