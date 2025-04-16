"use client";

import { createContext, useState, useContext, useEffect } from "react";
import { usePathname } from "next/navigation";
import { FlashContent } from "@/types/flashContent";
import { fetchFlash } from "@/lib/api/flash/fetchFlash";

// 使用するコンテキストの型定義 stateとsetState()を全コンポーネントで参照できるようにする
interface FlashContextType {
  flash: FlashContent | null;
  setFlash: (flash: FlashContent | null) => void;
}

// FlashContextを作成
const FlashContext = createContext<FlashContextType | undefined>(undefined);

// FlashContextを提供するラッパーコンポーネントを作成
export function FlashProvider({ children }: { children: React.ReactNode }) {
  const [flash, setFlash] = useState<FlashContent | null>(null);

  // FlashContext.ProviderでラップされたコンポーネントがflashとsetFlashを参照できるようにする
  return (
    <FlashContext.Provider value={{ flash, setFlash }}>
      <FlashMessage />
      {children}
    </FlashContext.Provider>
  );
};

// FlashContextを使用するためのカスタムフック
export const useFlash = () => {
  const context = useContext(FlashContext);
  if (!context) {
    throw new Error("useFlash must be used within a FlashProvider");
  }
  return context;
};

// FlashMessageを表示するコンポーネント
export const FlashMessage = () => {
  const { flash, setFlash } = useFlash();

  // ページ遷移時にflashDataを取得するため，pathnameを監視
  const pathname = usePathname();

  useEffect(() => {
    const getFlash = async () => {
      const flashData = await fetchFlash();
      setFlash(flashData);
    };
    getFlash();
  }, [setFlash, pathname]);

  if (!flash) {
    return null;
  }

  return (
    <div className="container px-10 fixed z-40 top-4">
      <div className={`p-3 rounded-lg shadow-lg text-white opacity-95
                        ${flash.type === "success" ? "bg-green-500" : "bg-red-500" }
                      `}>
        <div className="flex items-center justify-between gap-5">
          <p className="text-sm whitespace-pre-line">{flash.message}</p>
          <button className="shrink-0 text-sm" onClick={() => setFlash(null) }>閉じる</button>
        </div>
      </div>
    </div>
  )
}