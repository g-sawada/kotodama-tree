// 0409 postFetcher.tsの作成により，createSoulAction.tsに処理を移動
// コトダマ作成アクションはSSRで実行されないため，共通APIは使用しない

// import { Soul } from "@/types/soul";
// import { postFetch } from "../fetcher/postFetch";
// import redirectToLastVisitRoomAction from "@/lib/actions/user/redirectToLastVisitRoom";
// import { setFlash } from "../flash/setFlash";

// /**
//  * コトダマを新規作成するAPI souls#createをコールする
//  * @param content コトダマ本文
//  * @param creator_id コトダマ作成者のuser_id
//  * @returns Promise<Soul> (成功時)作成したコトダマ
//  */

// export const createSoul = async (
//   content: string,
//   creator_id: string
// ) => {
//   // 引数からURLパラメータを生成
//   const reqBody = {
//     soul: {
//       content: content,
//       creator_id: creator_id,
//     },
//   }

//   const result = await postFetch<Soul>(
//     `${process.env.NEXT_PUBLIC_API_URL}/api/${process.env.NEXT_PUBLIC_API_VERSION}/souls`,
//     reqBody
//   );

//   if(!result.isOk) {
//     // エラー処理未実装。userのlast_visit_roomにリダイレクトする共通処理を実装して実行
//     console.error("コトダマの作成時にエラーが発生しました");
//     redirectToLastVisitRoomAction({ errorMessage: result.body.error });
//   }

//   await setFlash("success", "新しいコトダマを捧げました");
  
//   // 仮実装。捧げアニメーションのあと、メイン画面へ
//   await redirectToLastVisitRoomAction()
// };
