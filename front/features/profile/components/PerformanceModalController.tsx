"use client";
import { useState } from "react";
import Button from "@/components/ui/Button";
import FullSizeModal from "@/components/ui/FullSizeModal";
import { User } from "@/types";
import PerformanceCard from "@/components/ui/PerformanceCard/PerformanceCard";

type Props = {
  soul: number;
  ownersouls: number;
  user: User;
  favorites: number;
};

export default function PerformanceModalController({ user, soul, ownersouls, favorites }: Props) {
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
        <PerformanceCard soul={soul} ownersouls={ownersouls} user={user} favorites={favorites} />
        <Button text="閉じる" handleClick={CloseModal} buttonType="cancel"/>
      </FullSizeModal>
    </>
  )
}
