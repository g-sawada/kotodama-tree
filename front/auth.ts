import NextAuth from "next-auth";
import { authConfig } from "@/auth.config";

/**
 * NextAuthに，auth.configで定義した設定情報を読み込ませ，認証に必要な関数を生成する
 */
export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  session: { strategy: "jwt"},
  ...authConfig
});