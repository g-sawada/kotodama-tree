"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import FullSizeModal from "@/components/ui/FullSizeModal";
import ResizeModal from "@/components/ui/ResizeModal";
import { User } from "@/types/user";
import { Tree } from "@/types/tree";
import { Soul } from "@/types/soul";
import SoulCardList from "../SoulCardList";
import SoulCard from "@/components/ui/SoulCard/SoulCard";

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


  const router = useRouter();

  const openListModal = () => setIsListModalOpen(true);
  const closeListModal = () => setIsListModalOpen(false);

  const openSoulModal = (soul: Soul) => {
    const deletable = soul.owner_id === user.id || soul.captured_tree_id === tree.id;
    setIsDeletable(deletable);
    setSelectedSoul(soul);
    setIsSoulModalOpen(true);
  };

  const closeSoulModal = () => {
    setSelectedSoul(null);
    setIsSoulModalOpen(false);
  };

  const deleteClick = async () => {
    setInProgress(true); // 押した瞬間ローディング状態に
    //-------削除処理実装-------//
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
          <div className="flex justify-center my-4">
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
            { isDeletable === false && (
              <div className="text-xs text-red-700">
                ＊手元にコトダマが戻るまで削除できません
              </div>
            )}
        </ResizeModal>
      )}
    </>
  );
}
