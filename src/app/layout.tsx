import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TODO Application",
  description: "Next.js + TypeScript + Local Storage",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th">
      <body>{children}</body>
    </html>
  );
}
