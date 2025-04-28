"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useFlash } from "@/components/layout/FlashMessage";

import Button from "@/components/ui/Button";
import FullSizeModal from "@/components/ui/FullSizeModal";
import ResizeModal from "@/components/ui/ResizeModal";
import { User } from "@/types/user";
import { Tree } from "@/types/tree";
import { Soul } from "@/types/soul";
import SoulCardList from "../SoulCardList";
import SoulCard from "@/components/ui/SoulCard/SoulCard";
import { deleteSoulAction } from "@/lib/actions/soul/deleteSoulAction";

type Props = {
  user: User;
  tree: Tree;
  souls: Soul[];
  isMyProfile: boolean;
};

export default function SoulModalController({ user, tree, souls, isMyProfile }: Props) {
  const [isListModalOpen, setIsListModalOpen] = useState(false); // 一覧表示用モーダル
  const [isSoulModalOpen, setIsSoulModalOpen] = useState(false); // 詳細表示用モーダル
  const [isModalOpen, setIsModalOpen] = useState(false); // 削除確認モーダルの開閉

  const [selectedSoul, setSelectedSoul] = useState<Soul | null>(null); // 選択されたコトダマ
  const [isDeletable, setIsDeletable] = useState<boolean | null>(null); // 手元にコトダマがある場合とない場合の削除表示切り替え

  // 一覧モーダルの開閉
  const openListModal = () => setIsListModalOpen(true);
  const closeListModal = () => setIsListModalOpen(false);

  // 削除確認モーダルの開閉
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // 削除処理確認後の処理
  const handleSubmit = () => {
    deleteClick();
    closeModal();
  };

  // 詳細モーダルの削除ボタンの表示
  const openSoulModal = (soul: Soul) => {
    const deletable = isMyProfile && (soul.owner_id === user.id || soul.captured_tree_id === tree.id);
    setIsDeletable(deletable);
    setSelectedSoul(soul);
    setIsSoulModalOpen(true);
  };

  // 詳細モーダルの閉じるボタン
  const closeSoulModal = () => {
    setSelectedSoul(null);
    setIsSoulModalOpen(false);
  };

  // 削除処理
  const { setFlash } = useFlash();
  const router = useRouter();

  const deleteClick = async () => {
    if (!selectedSoul) return;

    const res = await deleteSoulAction(selectedSoul.id, user.id);

    if (res.isOk) {
      setFlash({ type: "warning", message: "コトダマを削除しました"});
      // コトダマ詳細を閉じる
      closeSoulModal();
      router.refresh();
    } else {
      setFlash({ type: "error", message: "削除できませんでした"});
    }
  };

  return (
    <>
      <Button
        text="作成したコトダマ一覧"
        buttonType="ok"
        handleClick={openListModal}
      />
      <FullSizeModal isOpen={isListModalOpen}>
        <SoulCardList souls={souls} openModal={openSoulModal} />
        <div className="flex justify-center my-4">
          <Button
            text="閉じる"
            handleClick={closeListModal}
            buttonType="cancel"
          />
        </div>
      </FullSizeModal>

      {selectedSoul && (
        <ResizeModal isOpen={isSoulModalOpen}>
          <SoulCard soul={selectedSoul} >
            <div className="flex justify-between">
              <p className="text-gray-700 text-md">
                しゅうかくされたかいすう
                <span className="ml-2 font-bold">{selectedSoul.harvested_count}</span>
              </p>
            </div>
          </SoulCard>
          <div className="flex justify-center my-4 gap-8">
            { isMyProfile === true && (
            <Button
              text="削除"
              handleClick={openModal}
              buttonType="danger"
              isDisabled={!isDeletable}
            />
            )}
            <ResizeModal isOpen={isModalOpen}>
              <div className="p-6">
                <p className="text-lg mb-6 text-white text-center">本当に削除してもいいですか？</p>
                <div className="flex justify-center gap-4 mt-4">
                  <Button
                    text="はい"
                    handleClick={handleSubmit}
                    buttonType="ok"
                  />
                  <Button
                    text="いいえ"
                    handleClick={closeModal}
                    buttonType="cancel"
                  />
                </div>
              </div>
            </ResizeModal>
            <Button
              text="閉じる"
              handleClick={closeSoulModal}
              buttonType="cancel"
            />
          </div>
            { !isDeletable && (
              <div className="flex justify-center text-xs text-red-700">
                ＊手元にコトダマが戻るまで削除できません
              </div>
            )}
        </ResizeModal>
      )}
    </>
  );
}
