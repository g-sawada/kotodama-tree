import type { NextAuthConfig } from "next-auth";
import GitHub from "next-auth/providers/github";

export const authConfig: NextAuthConfig = {
  providers: [ 
    GitHub({ 
      clientId: process.env.AUTH_GITHUB_ID, 
      clientSecret: process.env.AUTH_GITHUB_SECRET
    })
  
  ],
  callbacks: {
    // JWTトークンに追加するデータをカスタマイズ name, email, imageはデフォルトで取得
    // accountは外部認証プロバイダから取得できる情報
    async jwt({token, account}) {
      // accoutが存在する（=認証ページからリダイレクトされた）場合
      if (!!account) {
        console.log("account");
        console.log(account);
      }
      return token;
    },
    // セッションに追加するデータをカスタマイズ（jwt -> sessionの順で実行される）
    async session({session, token}) {
      session.user = {
        ...session.user,
        // NOTE: デフォルトのAdapterUser型にemail, imageが含まれているが，不要のため空文字で初期化
        email: "",
        image: "",
      }
      return session;
    }
  }
}