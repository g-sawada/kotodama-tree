import type { Metadata } from "next";
import { DotGothic16 } from "next/font/google"
import "./globals.css";

export const metadata: Metadata = {
  title: "コトダマプロジェクト（仮）",
  description: "コトダマプロジェクト（仮）本番用アプリ",
};

const dotGothic16 = DotGothic16({ weight: '400', subsets: ['latin'] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={dotGothic16.className}>
        <div>
          {children}
        </div>
      </body>
    </html>
  );
}
