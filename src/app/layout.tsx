import "./globals.css";
import "./prosemirror.css";

import type { Metadata } from "next";
import { DM_Sans, Inter } from "next/font/google";
import localFont from "next/font/local";
import { Toaster } from "sonner";
import { TanstackProvider } from "@/providers";
import NextTopLoader from "nextjs-toploader";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dmSans",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const satoshi = localFont({
  src: [
    {
      path: "./fonts/Satoshi-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/Satoshi-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/Satoshi-Bold.otf",
      weight: "600",
      style: "normal",
    },
    {
      path: "./fonts/Satoshi-Black.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-satoshi",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Black Diamond Foundation",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={`${dmSans.variable} ${satoshi.variable} ${inter.variable} bg-[#111111]`}
      >
        <NextTopLoader showSpinner={false} color='white' />
        <TanstackProvider>
          {modal}
          {children}
        </TanstackProvider>
        <Toaster />
      </body>
    </html>
  );
}