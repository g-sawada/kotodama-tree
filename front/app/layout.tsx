import type { Metadata } from "next";
import { DotGothic16 } from "next/font/google"
import "./globals.css";
import Header from "@/components/layout/Header";
import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";
import { FlashProvider } from "@/components/layout/FlashMessage";

export const metadata: Metadata = {
  title: "コトダマプロジェクト（仮）",
  description: "コトダマプロジェクト（仮）本番用アプリ",
};

const dotGothic16 = DotGothic16({ weight: '400', subsets: ['latin'] });

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
      <html lang="ja">
        <SessionProvider session={session}>
          <body className={dotGothic16.className}>
            <div className="min-w-[360] sm:bg-gray-900">
              <div className="container mx-auto h-screen border-2 border-white text-white bg-gray-900">
                <div className="flex flex-col h-full"> 
                  <FlashProvider>
                    <Header />
                    {children}
                  </FlashProvider>
                </div>
              </div>
            </div>
          </body>
        </SessionProvider>
      </html>
  );
}
