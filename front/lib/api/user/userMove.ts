// 0409 patchFetcher.tsの作成により，userMoveAction.tsに処理を移動
// ユーザー移動アクションはSSRで実行されないため，共通APIは使用しない

// /**
//  * ユーザーの移動処理を行うAPIを呼び出す
//  * @param userId ユーザー名
//  * @param targetRoomId 移動先のルームID
//  * @returns FetchResult<RoomId>
//  */

// import { FetchResult } from "@/types/fetchResult";

// interface RoomId {
//   room_id: string;
// }
// export const userMove = async (
//   userId: string,
//   roomId: string,
// ): Promise<FetchResult<RoomId>> => {
//   try {
//     const res = await fetch(
//       `${process.env.NEXT_PUBLIC_API_URL}/api/${process.env.NEXT_PUBLIC_API_VERSION}/users/${userId}/move`,
//       {
//         method: "PATCH",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ room_id: roomId }),
//         cache: 'no-cache',
//       }
//     );

//     const body = await res.json();

//     if (!res.ok) {
//       // エラーレスポンスが返ってきた場合
//       return {
//         status: res.status,
//         isOk: false,
//         body: { error: body.error }
//       };

//     } else {
//       // 正常系レスポンスが返ってきた場合
//       return {
//         status: res.status,
//         isOk: true,
//         body: { data: body.data, message: body.message }
//       };
//     }

//   } catch {
//     // ネットワークエラー等でresやjsonパースに異常が発生した場合
//     return {
//       status: 500,
//       isOk: false,
//       body: { error: "サーバー通信エラー" }
//     };
//   }
// };

