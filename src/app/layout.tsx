import type { Metadata, Viewport } from "next";

import "./globals.css";
import Navbar from "@/components/Navbar";
import AuthSessionGuard from "@/components/AuthSessionGuard";

export const metadata: Metadata = {
  title: "FFOI - Freshwater Fish of Indonesia",
  description:
    "Yayasan Freshwater Fish of Indonesia - Konservasi dan penelitian ikan asli Indonesia",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className="overflow-x-hidden antialiased" suppressHydrationWarning>
        <AuthSessionGuard />
        <Navbar />
        {children}
      </body>
    </html>
  );
}