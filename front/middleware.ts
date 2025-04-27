import { auth } from "@/auth";

// ログインページ，新規登録ページのパス
const LOGIN_PATH = '/login';
const SIGN_UP_PATH = '/signup';
const REDIRECT_PATH_AFTER_LOGIN = '/loggedIn';
const MAINTENANCE_PATH = '/maintenance';

// auth関数をmiddlewareとして使用
export default auth( async (req) => {
  const { nextUrl } = req;
  // console.log( "this is middleware" );
  // console.log( "nextUrl", nextUrl );
  // console.log( "req.auth", req.auth );

  const isAuthenticated = !!req.auth;    // 認証済を判定
  const hasUuid = !!req.auth?.user.userId;    // 登録済を判定
  const isLoginRoute = nextUrl.pathname ===  LOGIN_PATH;
  const isSignUpRoute = nextUrl.pathname ===  SIGN_UP_PATH;

  // メンテナンス情報のチェック
  // NOTE: Data Cacheを使用するため，Route Handlerを経由する
  const response = await fetch(`${nextUrl.origin}/api/maintenance`);
  const result = await response.json();
  if (!result.isOk) {
    console.log(`[ERROR] メンテナンス情報の取得に失敗しました :${result.body.error}`);
    return Response.redirect(new URL('/', nextUrl));
  }
  // メンテナンス中の場合はメンテナンス中ページにリダイレクト
  const isMaintenance = result.body.data.isMaintenance;
  console.log(`[INFO] メンテナンス中?: ${isMaintenance}`);
  if(isMaintenance) {
    return Response.redirect(new URL(MAINTENANCE_PATH, nextUrl));
  }

  // ログインページにアクセスした場合
  if (isLoginRoute) {
    // 認証済み かつ ユーザー未登録 の場合
    if (isAuthenticated && !hasUuid) {
      return Response.redirect(new URL(SIGN_UP_PATH, nextUrl));
    }

    // 未ログイン または 登録済みの場合はそのまま表示
    return undefined;
  }

  // 新規登録ページにアクセスした場合
  if (isSignUpRoute) {
    // 認証前の場合はログインページにリダイレクト
    if (!isAuthenticated) {
        return Response.redirect(new URL(LOGIN_PATH, nextUrl));
    }

    // ユーザー登録済みの場合はホームページにリダイレクト
    if (hasUuid) {
      return Response.redirect(new URL(REDIRECT_PATH_AFTER_LOGIN, nextUrl));
    }

    // 認証済みかつユーザー登録が未完了の場合はそのまま表示
    return undefined;
  }

  // 認証の必要がある全てのページにアクセスした場合
  if (!isAuthenticated) {
    return Response.redirect(new URL(LOGIN_PATH, nextUrl));
  }

  // 認証済みかつユーザー登録が未完了の場合は新規登録ページにリダイレクト
  if (!hasUuid) {
    return Response.redirect(new URL(SIGN_UP_PATH, nextUrl));
  }

  // ログイン済みかつユーザー登録済みの場合はそのまま表示
  return undefined;
});

// matcherでmiddlewareを適用するパスを指定
export const config = {
  // 参考: https://zenn.dev/hayato94087/articles/ec16174696a375
  matcher: [
    '/login',
    '/signup',
    '/loggedIn',
    '/m/:path*',
    '/profile/:path*'
  ],
};