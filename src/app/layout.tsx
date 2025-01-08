/** @format */

import type {Metadata} from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "./Navbar";

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
  icons: {
    icon: "/nipstec-fav-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Navbar />
        <div className="w-full min-w-screen mx-auto  mt-[100px]">
          {children}
        </div>
      </body>
    </html>
  );
}
