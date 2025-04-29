"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { useSession } from "next-auth/react";

import getSoulsAction from "@/lib/actions/soul/getSoulsAction";
import { Soul } from "@/types/soul";

import Button from "@/components/ui/Button";
import { useFlash } from "@/components/layout/FlashMessage";
import FullSizeModal from "@/components/ui/FullSizeModal";

import CarryingSoulCardList from "./CarryingSoulCardList";

/**
 * 手持ちのコトダマ一覧用のモーダルコントローラー
 * @param isRoomOwner ログイン中ユーザー本人の部屋にいる時のみtrue。デフォルトはfalse
 */

type Props = {
  isRoomOwner?: boolean;
};

export default function CarryingSoulsModalController({
  isRoomOwner = false,
}: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [souls, setSouls] = useState<Soul[]>([]);
  const router = useRouter();
  const roomId = useParams().roomId;  // URLパラメータからroomIdを取得
  const { setFlash } = useFlash();

  // session情報を取得
  const session = useSession();
  const userId = session.data?.user.userId;

  // モーダルの開閉制御
  const openModal = async () => {
    setIsModalOpen(true);
    // モーダルを開いた時にユーザーが所持中のコトダマ一覧データを取得
    const getSoulsResult = await getSoulsAction({ owner_id: userId });
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
        className="flex flex-col items-center flex-1 py-4"
      >
        <Image
          src="/icon_images/footer_kotodama.svg"
          alt="Icon 1"
          width={20}
          height={20}
          className="mb-1"
        />
        <span className="text-[0.5rem] btm-nav-label">手持ちのコトダマ</span>
      </button>

      <div>
        <FullSizeModal isOpen={isModalOpen}>
          <h1 className="text-center text-xl font-bold">
            手持ちのコトダマ一覧
          </h1>
          <div className="my-4">
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
            <CarryingSoulCardList souls={souls} />
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
