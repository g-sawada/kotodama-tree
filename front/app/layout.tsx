import type { Metadata } from "next";
import { DotGothic16 } from "next/font/google"
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

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
        <div className="min-w-[360] sm:bg-gray-700 md:bg-blue-500 lg:bg-yellow-500 xl:bg-green-500">
          <div className="container mx-auto h-screen border-2 border-white text-white bg-gray-900">
            <div className="flex flex-col justify-between h-full"> 
              <Header />
              {children}
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
