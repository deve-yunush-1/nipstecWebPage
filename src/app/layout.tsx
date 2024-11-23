/** @format */

import type {Metadata} from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "NIPSTec limited admin panel",
  description: "NIPSTec limited admin panel",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <link rel="icon" href="/nipstec-fav-icon.png" sizes="any" />
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <div className="w-full min-h-screen mx-auto max-w-screen-lg ">
          {children}
        </div>
      </body>
    </html>
  );
}
