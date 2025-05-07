"use client";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";

import getSoulsAction from "@/lib/actions/soul/getSoulsAction";

import { Soul } from "@/types/soul";
import { User } from "@/types/user";
import { Tree } from "@/types/tree";

import Button from "@/components/ui/Button";
import FullSizeModal from "@/components/ui/FullSizeModal";
import TreeImg from "@/components/ui/TreeImg";
import { useFlash } from "@/components/layout/FlashMessage";

import TreeSoulCardList from "@/features/main/Tree/components/TreeSoulCardList";

/**
 * キのコトダマ一覧用のモーダルコントローラー
 * @param isRoomOwner ログイン中ユーザー本人の部屋にいる時のみtrue。デフォルトはfalse
 * @param treeId 滞在中のroomに紐づくtree_idを受け取る
 */

type Props = {
  isRoomOwner?: boolean;
  tree: Tree;
  user: User;
};

export default function TreeSoulsModalController({
  isRoomOwner = false,
  tree,
  user,
}: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [souls, setSouls] = useState<Soul[]>([]);
  const router = useRouter();
  const roomId = useParams().roomId as string;  // URLパラメータからroomIdを取得
  const { setFlash } = useFlash();

  // ユーザーのコトダマ収穫可否
  const canHarvest = user.carrying_souls_count < user.max_carry_souls

  // モーダルの開閉制御
  const openModal = async () => {
    setIsModalOpen(true);
    // モーダルを開いたときにキのコトダマ一覧を取得
    const getSoulsResult = await getSoulsAction({ captured_tree_id: tree.id });
    if (!getSoulsResult.isOk) {
      // エラー処理
      setFlash({ type: "error", message: "コトダマの取得に失敗しました。 \n ページを再読み込みして下さい。" });
      return;
    }
    const souls = getSoulsResult.body.data;
    setSouls(souls);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <button
        onClick={() => openModal()}
        className="flex flex-col items-center flex-1 my-4 md:my-0"
      >
        <TreeImg />
      </button>

      <div>
        <FullSizeModal isOpen={isModalOpen}>
          <div className="absolute">
            <button className="p-1 bg-gray-500 border-2 border-white rounded" onClick={closeModal}>とじる</button>
          </div>
          <h1 className="text-center text-xl font-bold mb-6">キにやどるコトダマ</h1>
          {souls.length ? (
            // 捧げられているコトダマが1つ以上ある場合
            <>
              {!isRoomOwner && canHarvest && (
                <p className="text-center mt-2">タップしてしゅうかく</p>
              )}
              {!isRoomOwner && !canHarvest && (
                <p className="text-center text-yellow-300 mt-2">
                  手持ちがいっぱいのため，しゅうかくできません
                </p>
              )}
            </>
            ) : (
            // 捧げられているコトダマがない場合
              <p className="text-center mt-2 text-gray-500">コトダマがありません</p>
            )}
          
          <div className="my-4">
            <TreeSoulCardList
              souls={souls}
              isRoomOwner={isRoomOwner}
              canHarvest={canHarvest}
            />
            {/* ユーザー自身の部屋の時のみ捧げページへのリンクを表示 */}
            {isRoomOwner && (
              <div className="flex justify-center my-4">
                <Button
                  text="コトダマを捧げる"
                  handleClick={() => router.push(`/m/${roomId}/offer`)}
                  buttonType="ok"
                />
              </div>
            )}
          </div>
        </FullSizeModal>
      </div>
    </>
  );
}
