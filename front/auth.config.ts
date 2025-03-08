import type { DefaultSession, NextAuthConfig } from "next-auth";
import {} from "next-auth/jwt";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Twitter from "next-auth/providers/twitter";

// tokenとsessionにカスタムデータを追加するための型拡張
declare module "next-auth" {
  interface Session {
    user: {
      provider?: string;
      provider_id?: string;
    } & DefaultSession["user"];
  }
}

// jwtはモジュールが異なるので別途型拡張
declare module "next-auth/jwt" {
  interface JWT {
    provider?: string;
    provider_id?: string;
  }
}

export const authConfig: NextAuthConfig = {
  providers: [ 
    GitHub({ 
      clientId: process.env.AUTH_GITHUB_ID, 
      clientSecret: process.env.AUTH_GITHUB_SECRET
    }),
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET
    }),
    Twitter({
      clientId: process.env.AUTH_X_ID,
      clientSecret: process.env.AUTH_X_SECRET
    })
  ],
  callbacks: {
    // JWTトークンに追加するデータをカスタマイズ name, email, imageはデフォルトで取得
    // accountは外部認証プロバイダから取得できる情報
    async jwt({token, account}) {
      // accoutが存在する（=認証ページからリダイレクトされた）場合
      if (!!account) {
        token.provider = account.provider;
        token.provider_id = account.providerAccountId
      }
      return token;
    },
    // セッションに追加するデータをカスタマイズ（jwt -> sessionの順で実行される）
    async session({session, token}) {
      session.user = {
        ...session.user,
        provider: token.provider,
        provider_id: token.provider_id,
        // NOTE: デフォルトのAdapterUser型にemail, imageが含まれているが，不要のため空文字で初期化
        email: "",
        image: "",
      }
      return session;
    }
  }
}