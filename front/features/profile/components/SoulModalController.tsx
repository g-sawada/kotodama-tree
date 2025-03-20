"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import FullSizeModal from "@/components/ui/FullSizeModal";
import ResizeModal from "@/components/ui/ResizeModal";
import { Soul } from "@/types/soul";
import UserCardList from "@/components/ui/UserCard/UserCardList";
import UserCard from "@/components/ui/UserCard/UserCard";


type Props = {
  souls: Soul[];
};

export default function SoulModalController({ souls }: Props) {
  const [isListModalOpen, setIsListModalOpen] = useState(false); // 一覧表示用モーダル
  const [isSoulModalOpen, setIsSoulModalOpen] = useState(false); // 個別表示用モーダル
  const [selectedSoul, setSelectedSoul] = useState<Soul | null>(null); // 選択されたコトダマ
  const router = useRouter();

  const openListModal = () => setIsListModalOpen(true);
  const closeListModal = () => setIsListModalOpen(false);

  const openSoulModal = (soul: Soul) => {
    setSelectedSoul(soul);
    setIsSoulModalOpen(true);
  };

  const closeSoulModal = () => {
    setSelectedSoul(null);
    setIsSoulModalOpen(false);
  };

  return (
    <>
    <Button text="作成したコトダマ一覧" buttonType="ok" handleClick={openListModal}/>
      <FullSizeModal isOpen={isListModalOpen}>
        <UserCardList souls={souls} openModal={openSoulModal} />
        <div className="flex justify-center my-4">
          <Button text="閉じる" handleClick={closeListModal} buttonType="cancel"/>
        </div>
      </FullSizeModal>


      {selectedSoul && (
        <ResizeModal isOpen={isSoulModalOpen}>
          <UserCard soul={selectedSoul}/>
          <div className="flex justify-center my-4">
            <Button text="削除" handleClick={() => router.push("#")} buttonType="danger"/>
            <Button text="閉じる" handleClick={closeSoulModal} buttonType="cancel" />
            </div>
        </ResizeModal>
      )}
    </>
  );
}
