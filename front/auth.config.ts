import type { DefaultSession, NextAuthConfig } from "next-auth";
import {} from "next-auth/jwt";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Twitter from "next-auth/providers/twitter";
import { getUserByProvider } from "./lib/api/user/getUserByProvider";
import { redirect } from "next/navigation";

// tokenとsessionにカスタムデータを追加するための型拡張
declare module "next-auth" {
  interface Session {
    user: {
      userId?: string;
      provider?: string;
      provider_id?: string;
    } & DefaultSession["user"];
  }
}

// jwtはモジュールが異なるので別途型拡張
declare module "next-auth/jwt" {
  interface JWT {
    userId?: string;
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

        // DEBUG: DUMMY_USER_MODEがtrueの場合は，providerとproviderAccountIdを環境変数から上書き
        if(process.env.DUMMY_USER_MODE === "true" ) {
          console.log("============== DUMMY_USER_MODE ==============");
          console.log(`provider: ${process.env.DUMMY_USER_PROVIDER}`);
          console.log(`providerAccountId: ${process.env.DUMMY_USER_PROVIDER_ID}`);

          account.provider = process.env.DUMMY_USER_PROVIDER as string;
          account.providerAccountId = process.env.DUMMY_USER_PROVIDER_ID as string;
        }

        const result = await getUserByProvider(account.provider, account.providerAccountId);
        console.log(result);

        // isOkがfalseの場合はErrorResponse
        if (!result.isOk) {
          console.log("ユーザーの情報取得時にエラーが発生しました");
          redirect("/login");
        }

        const userData = result.body.data;
        console.log(`userData: ${userData}`);

        // userDataがnullの場合は新規ユーザーとして扱うため，tokenにproviderとprovider_idを追加
        if (userData === null) {
          console.log("新規ユーザーが認証されました" );
          token.provider = account.provider;
          token.provider_id = account.providerAccountId
          return token;
        }
        
        // userIdが取得できた場合は，tokenにuserIdを追加
        console.log("既存ユーザーが認証されました");
        token.userId = userData.id;
        return token;
      }
      
      // アクセス時にtoken.providerとtoken.provider_idが存在し，token.userIdが存在しない場合 
      if (!!token.provider && !!token.provider_id) {
        console.log("tokenにproviderとprovider_idが存在。userIdを取得します");
        const result = await getUserByProvider(token.provider, token.provider_id);
        console.log(result);
        
        // isOkがfalseの場合はErrorResponse
        if (!result.isOk) {
          console.log("ユーザーの情報取得時にエラーが発生しました");
          redirect("/login");
        }

        const userData = result.body.data;
        // userが取得できた場合(=登録処理完了済み）uuidをtokenに追加
        if (!!userData) {
          console.log("既存ユーザーが認証されました")
          token.userId = userData.id;
          // provider, provider_idは不要のため削除
          token.provider = "";
          token.provider_id = "";
        }
      }

      console.log("通常の認証処理です");
      return token
    },

    // セッションに追加するデータをカスタマイズ（jwt -> sessionの順で実行される）
    async session({session, token}) {
      session.user = {
        ...session.user,
        userId: token.userId ? token.userId : "",
        provider: token.provider ? token.provider : "",
        provider_id: token.provider_id ? token.provider_id : "",
        // NOTE: デフォルトのAdapterUser型にemail, imageが含まれているが，不要のため空文字で初期化
        email: "",
        image: "",
      }
      return session;
    }
  }
}