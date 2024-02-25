import Head from "next/head";
import "./globals.css";
import { Lora } from "next/font/google";
import RootProviders from "../providers/RootProviders";

const lora = Lora({ subsets: ["latin"] });

Intl.DateTimeFormat = (locales, options) =>
  new Intl.DateTimeFormat("pl-PL", options);

export const metadata = {
  title: "Barber Shop",
  description: "Salon fryzjerski - Barber Shop",
};

const MainLayout = ({ children }) => {
  return (
    <html lang="pl">
      <Head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <title>Barber Shop - Denis Hylla</title>
      </Head>
      <body className={lora.className}>
        <RootProviders>{children}</RootProviders>
      </body>
    </html>
  );
};

export default MainLayout;
