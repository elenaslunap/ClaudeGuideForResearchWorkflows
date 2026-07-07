import type { Metadata } from "next";
import { Source_Serif_4, Nunito_Sans, Space_Mono } from "next/font/google";
import Header from "@/components/Header";
import "@/styles/globals.css";

const sourceSerif4 = Source_Serif_4({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-display",
});

const nunitoSans = Nunito_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Claude Research Field Guide",
  description:
    "A reference guide teaching researchers how to use Claude as a research assistant.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${sourceSerif4.variable} ${nunitoSans.variable} ${spaceMono.variable}`}
      >
        <Header />
        {children}
      </body>
    </html>
  );
}
