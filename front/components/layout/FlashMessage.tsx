"use client";

import { createContext, useState, useContext } from "react";

// Flashオブジェクトの型定義
interface FlashContent {
  type: "error" | "success" | "info" | "warning";
  message: string | null;
}

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
export const FlashMessage =() => {
  const { flash, setFlash } = useFlash();

  if (!flash) {
    return null;
  }

  return (
    <div className="container px-10 fixed z-40 top-4">
      <div className={`p-3 rounded-lg shadow-lg text-white opacity-95
                        ${flash.type === "success" ? "bg-green-500" : "bg-red-500" }
                      `}>
        <div className="flex items-center justify-between gap-5">
          <p className="text-sm">{flash.message}</p>
          <button className="shrink-0 text-sm" onClick={() => setFlash(null) }>閉じる</button>
        </div>
      </div>
    </div>
  )
}