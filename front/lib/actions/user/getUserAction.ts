// 0409 getFetcher.tsの作成により，getUser.tsに処理を移動
// ユーザー情報取得は現状，必ずサーバーコンポーネントで実行されるため，server actionとしては実装しない

// "use server"

// import { auth } from "@/auth"
// import { redirect } from "next/navigation";
// import redirectToLastVisitRoomAction from "./redirectToLastVisitRoom";
// import { getUser } from "@/lib/api/user/getUser";

// /**
//  * ユーザー情報を取得するサーバーアクション 
//  * @returns [User] ユーザー情報
//  */

// export default async function getUserAction() {
//   // セッションからユーザーIDを取得
//   const session = await auth();
//   if (!session?.user.userId) { 
//     redirect("/login");
//   }
//   const userId = session.user.userId;
  
//   // ユーザー情報を取得
//   const result = await getUser(userId);

//   if(!result.isOk || !result.body.data) {
//     // エラー処理未実装。userのlast_visit_roomにリダイレクトする共通処理を実装して実行
//     redirectToLastVisitRoomAction({errorMessage: "ユーザー情報を正しく取得できませんでした。"}); 
//     return null;
//   }
//   const user = result.body.data;
//   return user;
// }