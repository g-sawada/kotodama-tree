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
  const [isSoulModalOpen, setIsSoulModalOpen] = useState(false); // 個別表示用モーダル
  const [selectedSoul, setSelectedSoul] = useState<Soul | null>(null); // 選択されたコトダマ
  const [inProgress, setInProgress] = useState(false);
  const [isDeletable, setIsDeletable] = useState<boolean | null>(null);

  const openListModal = () => setIsListModalOpen(true);
  const closeListModal = () => setIsListModalOpen(false);

  const openSoulModal = (soul: Soul) => {
    const deletable = isMyProfile && (soul.owner_id === user.id || soul.captured_tree_id === tree.id);
    setIsDeletable(deletable);
    setSelectedSoul(soul);
    setIsSoulModalOpen(true);
  };

  const closeSoulModal = () => {
    setSelectedSoul(null);
    setIsSoulModalOpen(false);
  };

  const { setFlash } = useFlash();
  const router = useRouter();

  const deleteClick = async () => {
    if (!selectedSoul) return;

    const confirmed = window.confirm("このコトダマを削除してもよろしいですか？");
    if (!confirmed) return;

    setInProgress(true); // 押した瞬間ローディング状態に

    const res = await deleteSoulAction(selectedSoul.id, user.id);


    if (res.isOk) {
      setFlash({ type: "warning", message: "コトダマを削除しました"});
      // コトダマ詳細を閉じる
      closeSoulModal();
      router.refresh();
    } else {
      setFlash({ type: "error", message: "削除できませんでした"});
    }

    setInProgress(false);
  };

  return (
    <>
      <Button
        text="作成したコトダマ一覧"
        buttonType="ok"
        handleClick={openListModal}
      />
      <FullSizeModal isOpen={isListModalOpen}>
        <SoulCardList souls={souls} openModal={openSoulModal} isMyProfile={isMyProfile}/>
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
            { isMyProfile === true && (
            <div className="flex justify-between">
              <p className="text-gray-700 text-md">
                しゅうかくされたかいすう
                <span className="ml-2 font-bold">{selectedSoul.harvested_count}</span>
              </p>
            </div>
            )}
          </SoulCard>
          <div className="flex justify-center my-4 gap-8">
            { isMyProfile === true && (
            <Button
              text={inProgress ? "削除中…" : "削除"}
              handleClick={deleteClick}
              buttonType="danger"
              inProgress={inProgress}
              isDisabled={!isDeletable}
            />
            )}
            <Button
              text="閉じる"
              handleClick={closeSoulModal}
              buttonType="cancel"
            />
          </div>
            { isMyProfile && !isDeletable && (
              <div className="flex justify-center text-xs text-red-700">
                ＊手元にコトダマが戻るまで削除できません
              </div>
            )}
        </ResizeModal>
      )}
    </>
  );
}
