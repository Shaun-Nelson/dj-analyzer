import type { Metadata } from "next";
import { openSans } from "./fonts/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "DJ Analyzer",
  description: "Analyze any track from Spotify with stats relevant to DJs.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={`${openSans.className} antialiased bg-neutral-100 dark:bg-neutral-700`}
      >
        <main>{children}</main>
      </body>
    </html>
  );
}
