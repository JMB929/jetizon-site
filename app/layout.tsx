import type { Metadata, Viewport } from "next";
import JetizonChatbot from "./components/jetizon-chatbot";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  title: "Jetizon Motorbike Intech LLC",
  description: "Powering the next wave of electric mobility",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Jetizon Onsite",
  },
  formatDetection: {
    telephone: false,
  },
};

export const viewport: Viewport = {
  themeColor: "#050505",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        {children}
        <JetizonChatbot />
        <Analytics />
      </body>
    </html>
  );
}
