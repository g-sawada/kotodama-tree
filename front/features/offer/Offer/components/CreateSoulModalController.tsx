"use client";

import { useEffect, useState } from "react";

import { User } from "@/types/user";

import getUserAction from "@/lib/actions/user/getUserAction";
import getSoulsAction from "@/lib/actions/soul/getSoulsAction";

import Button from "@/components/ui/Button";
import FullSizeModal from "@/components/ui/FullSizeModal";
import { createSoulAction } from "@/lib/actions/soul/createSoulAction";

/**
 * コトダマ作成用のモーダルコントローラー
 *
 */

export default function CreateSoulsModalController() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [, setUser] = useState<User | null >(null);
  const [creatableCount, setCreatableCount] = useState(0);

  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  // 初回マウント時に必要なデータを取得
  useEffect(() => {
    const fetchData = async () => {
      // ユーザー情報を取得してstateにセット
      const fetchedUser = await getUserAction();
      if(!fetchedUser) return;
      setUser(fetchedUser);

      // 作成可能コトダマ数を取得
      const createdSols = await getSoulsAction({ creator_id: fetchedUser.id });
      setCreatableCount(fetchedUser.max_create_souls - createdSols.length);
    }

    fetchData();
  }, []);

  // モーダルの開閉制御
  const openModal = async () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // フォームの値の変更を検知してstateにセット
  const handleFormChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setContent(value);
    if (value.length === 0) {
      setError("コトダマは1文字以上入力してください");
    } else if (value.length > 80) {
      setError("コトダマは80文字以内で入力してください");
    } else {
      setError("");
    }
  }

  return (
    <>
      {creatableCount <= 0 && <p>コトダマ作成上限に達しています</p>}
      <div className="text-center">
        <Button
          text="新たにコトダマを創る"
          buttonType="ok"
          handleClick={() => openModal()}
          isDisabled={creatableCount <= 0} // 作成上限に達している場合はdisable
        />
      </div>

      <div>
        <FullSizeModal isOpen={isModalOpen}>
          <h1 className="text-center text-xl font-bold">コトダマを創る</h1>
          <form action={createSoulAction} className="my-8 flex flex-col items-center">

            <p>作成可能コトダマ数：あと{creatableCount}個</p>

            <textarea
              name="content"
              value={content}
              onChange={handleFormChange}
              className="bg-gray-900 border-white border-2 rounded-lg w-[90%] overflow-y-auto my-4 h-40 max-w-80 p-2 resize-none"
              placeholder="コトダマを入力してください"
            ></textarea>

            <div className="min-h-10">
              {error && <p className="text-red-500">{error}</p>}
            </div>

            <div className="mt-10">
              <Button
                text="コトダマを捧げる"
                submit={true}
                buttonType="ok"
                isDisabled={!(content.length > 0 && content.length <= 80)}
              />
            </div>
          </form>
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
