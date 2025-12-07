import type { Metadata } from "next";
import "./globals.css";

// Load IBM Plex Sans
import { IBM_Plex_Sans } from "next/font/google";

const ibmPlex = IBM_Plex_Sans({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-ibm-plex",
});

export const metadata: Metadata = {
  title: "Retail Sales Management System",
  description: "Dashboard for managing retail sales data",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${ibmPlex.variable} antialiased bg-gray-50`}
        style={{ fontFamily: "var(--font-ibm-plex)" }}
      >
        {children}
      </body>
    </html>
  );
}
