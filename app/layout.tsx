import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "YouTube",
  description: "Share and discover videos",
  icons: {
    icon: "https://www.youtube.com/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
