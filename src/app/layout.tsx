import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import {
  DynamicContextProvider,
  EthereumWalletConnectors,
  DynamicWagmiConnector,
} from "../lib/dynamic";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FideRewards",
  icons: {
    icon: "/images/logo.png",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <DynamicContextProvider
        settings={{
          environmentId: "4d1c7738-95b1-4dfe-abe6-bac0b4cc2138",
          walletConnectors: [EthereumWalletConnectors],
        }}
      >
        <DynamicWagmiConnector>
            <body className={inter.className}>{children}</body>
        </DynamicWagmiConnector>
      </DynamicContextProvider>
    </html>
  );
}
