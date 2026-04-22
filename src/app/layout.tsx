import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SinoTrade Compliance | GACC Decree 248 Registration Experts",
  description: "Fast, compliant, and guaranteed GACC registration for global Food & Beverage brands. We handle the complex Chinese CIFER system so you can focus on exporting.",
  keywords: "GACC, Decree 248, China customs, CIFER, food export China, F&B registration",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-full flex flex-col antialiased">{children}</body>
    </html>
  );
}