"use client";
import { useState } from "react";
import Button from "@/components/ui/Button";
import FullSizeModal from "@/components/ui/FullSizeModal";
import PerformanceCard from "@/components/ui/PerformanceCard/PerformanceCard";



export default function PerformanceModalController() {
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
        <PerformanceCard />
        <div className="flex justify-center">
          <Button text="閉じる" handleClick={CloseModal} buttonType="cancel"/>
        </div>
      </FullSizeModal>
    </>
  )
}
