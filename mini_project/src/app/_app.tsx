"use client";

import { SessionProvider } from "next-auth/react";
import "./globals.css";

export default function MyApp({ Component, pageProps }: any) {
  return (
    <SessionProvider session={pageProps.session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}