import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./features/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        sm: "480px",  // スマートフォン
        md: "744px",  // タブレット, スマートフォン横
        lg: "960px",  // タブレット, スマートフォン横
        xl: "1280px",  // ノートPC, タブレット横
        full: { raw: '(min-height: 667px)' } // スマホの横向きで要素が切れてしまう問題に対処。メイン画面の高さの合計を設定
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
} satisfies Config;
