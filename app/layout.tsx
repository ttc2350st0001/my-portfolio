import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Yuki | Web Engineer Portfolio",
  description: "システムエンジニアを目指すYukiのポートフォリオ",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}