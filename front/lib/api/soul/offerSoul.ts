// 0409 postFetcher.tsの作成により，createSoulAction.tsに処理を移動
// コトダマ作成アクションはSSRで実行されないため，共通APIは使用しない

// /**
//  * コトダマを捧げるAPIを呼び出す
//  * @param soul_id 捧げる対象のコトダマid
//  * @param user_id 捧げを実行するユーザーのid
//  * @param room_id 捧げが実行される部屋のid
//  * @returns FetchResult<Soul>
//  */

// import { FetchResult } from "@/types/fetchResult";
// import { Soul } from "@/types/soul";

// export const offerSoul = async (
//   soul_id: number,
//   user_id: string,
//   room_id: string
// ): Promise<FetchResult<Soul>> => {
//   try {
//     const res = await fetch(
//       `${process.env.NEXT_PUBLIC_API_URL}/api/${process.env.NEXT_PUBLIC_API_VERSION}/souls/${soul_id}/offer`,
//       {
//         method: "PATCH",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ user_id: user_id, room_id: room_id }),
//         cache: "no-cache",
//       }
//     );
//     const body = await res.json();

//     if (!res.ok) {
//       // エラーレスポンスが返ってきた場合
//       return {
//         status: res.status,
//         isOk: false,
//         body: { error: body.error },
//       };
//     } else {
//       // 正常系レスポンスが返ってきた場合
//       return {
//         status: res.status,
//         isOk: true,
//         body: { data: body.data, message: body.message },
//       };
//     }
//   } catch {
//     // ネットワークエラー等でresやjsonパースに異常が発生した場合
//     return {
//       status: 500,
//       isOk: false,
//       body: { error: "サーバー通信エラー" },
//     };
//   }
// };
