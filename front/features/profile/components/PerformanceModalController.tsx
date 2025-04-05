"use client";
import { useState } from "react";
import Button from "@/components/ui/Button";
import FullSizeModal from "@/components/ui/FullSizeModal";
import PerformanceCard from "@/features/profile/PerformanceCard";
import { User } from "@/types/user";
import { Performance } from "@/types/performance";

type Props = {
  user: User;
  performance: Performance;
};


export default function PerformanceModalController({ user, performance }: Props) {
  const [ModalOpen, setModalOpen] = useState(false);

  const OpenModal = () => {
    setModalOpen(true);
  };

  const CloseModal = () => {
    setModalOpen(false);
  };

  return (
    <>
    <Button text="じっせきをみる" buttonType="cancel" handleClick={OpenModal}/>
      <FullSizeModal isOpen={ModalOpen}>
        <PerformanceCard user={user} performance={performance}/>
        <div className="flex justify-center">
          <Button text="閉じる" handleClick={CloseModal} buttonType="cancel"/>
        </div>
      </FullSizeModal>
    </>
  )
}
