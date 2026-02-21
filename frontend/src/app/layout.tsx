import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import arialLocal from "next/font/local";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
});
const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700"],
});
const arial = arialLocal({
  variable: "--font-arial",
  src: "./fonts/arial/arial.ttf",
});

export const metadata: Metadata = {
  title: "FinTrack",
  description:
    "A personal finance management application built with MERN stack",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/assets/img/icons/favicon-arrow.svg", type: "image/svg+xml" },
    ],
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
        className={`${inter.variable} ${arial.variable} ${poppins.variable} font-inter font-normal`}
      >
        <div className="wrapper">
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}
