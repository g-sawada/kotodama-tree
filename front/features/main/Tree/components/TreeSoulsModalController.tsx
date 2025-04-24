"use client";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Soul } from "@/types/soul";
import { User } from "@/types/user";
import getSoulsAction from "@/lib/actions/soul/getSoulsAction";
import Button from "@/components/ui/Button";
import FullSizeModal from "@/components/ui/FullSizeModal";
import TreeImg from "@/components/ui/TreeImg";
import TreeSoulCardList from "@/features/main/Tree/components/TreeSoulCardList";
import { Tree } from "@/types/tree";

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
  const roomId = useParams().roomId as string; // URLパラメータからroomIdを取得

  // ユーザーのコトダマ収穫可否
  const canHarvest = user.carrying_souls_count < user.max_carry_souls;

  // モーダルの開閉制御
  const openModal = async () => {
    setIsModalOpen(true);
    // モーダルを開いたときにキのコトダマ一覧を取得
    const souls: Soul[] = await getSoulsAction({ captured_tree_id: tree.id });
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
          <h1 className="text-center text-xl font-bold">コトダマ一覧</h1>
          {souls.length ? (
            <>
          {!isRoomOwner && canHarvest && (
            <p className="text-center mt-2">タップしてしゅうかく</p>
          )}
          {!isRoomOwner && !canHarvest && (
            <p className="text-center mt-2">
              手持ちコトダマが上限値のためしゅうかくできません
            </p>
          )}
          </>)
          : (
            <p className="text-center mt-2">コトダマがありません</p>
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
          <div className="flex justify-center my-4">
            <Button
              text="閉じる"
              handleClick={() => closeModal()}
              buttonType="cancel"
            />
          </div>
        </FullSizeModal>
      </div>
    </>
  );
}
