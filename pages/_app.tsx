import "@/styles/globals.css";
import "@/styles/index.css";
import "@/styles/message.css";
import type { AppProps } from "next/app";
import { AccountProvider } from "@/contexts/AccountContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <AccountProvider>
        <Component {...pageProps} />
      </AccountProvider>
    </>
  );
}
