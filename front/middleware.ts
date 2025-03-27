import { auth } from "@/auth";

// ログインページ，新規登録ページのパス
const LOGIN_PATH = '/login';
const SIGN_UP_PATH = '/signup';
const REDIRECT_PATH_AFTER_LOGIN = '/loggedIn';

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

  // console.log('pathname', nextUrl.pathname);
  // console.log('isAuthenticated', isAuthenticated);
  // console.log('hasUuid', hasUuid);

  // ログインページにアクセスした場合
  if (isLoginRoute) {
    console.log("ログインページにアクセスしました");
    // 認証済みの場合
    if (isAuthenticated) {
        // かつユーザー未登録の場合は新規登録ページにリダイレクト
        if(!hasUuid) {
          console.log("未登録のため，新規登録ページにリダイレクトします");
          return Response.redirect(new URL(SIGN_UP_PATH, nextUrl));
        }
        // ユーザー登録済みの場合はホームページにリダイレクト
        console.log("ログイン済みのため，メイン画面にリダイレクトします");
        return Response.redirect(new URL(REDIRECT_PATH_AFTER_LOGIN, nextUrl));
    }
    // ログインしていない場合はそのまま表示
    return undefined;
  }

  // 新規登録ページにアクセスした場合
  if (isSignUpRoute) {
    // 認証前の場合はログインページにリダイレクト
    if (!isAuthenticated) {
        console.log("ログインしていないため，ログインページにリダイレクトします");
        return Response.redirect(new URL(LOGIN_PATH, nextUrl));
    }

    // ユーザー登録済みの場合はホームページにリダイレクト
    if (hasUuid) {
      console.log("登録済みのため，メイン画面にリダイレクトします");
      return Response.redirect(new URL(REDIRECT_PATH_AFTER_LOGIN, nextUrl));
    }

    // 認証済みかつユーザー登録が未完了の場合はそのまま表示
    return undefined;
  }

  // 認証の必要がある全てのページにアクセスした場合
  if (!isAuthenticated) {
    console.log("未認証のため，ログインページにリダイレクトします");
    return Response.redirect(new URL(LOGIN_PATH, nextUrl));
  }

  // 認証済みかつユーザー登録が未完了の場合は新規登録ページにリダイレクト
  if (!hasUuid) {
    console.log("未登録のため，新規登録ページにリダイレクトします");
    return Response.redirect(new URL(SIGN_UP_PATH, nextUrl));
  }

  // ログイン済みかつユーザー登録済みの場合はそのまま表示
  return undefined;
});

// matcherでmiddlewareを適用するパスを指定
export const config = {
  matcher: [
    '/login',
    '/signup',
    '/loggedIn',
    '/mock',],
};