import { Soul } from "@/types/soul";
import UserCard from "./UserCard";

type Props = {
  souls: Soul[];
  openModal: (soul: Soul) => void;
};

export default function UserCardList({ souls, openModal }: Props) {
  
  return (
    <>
    <div className="mx-auto w-full">
      <div className="flex flex-col gap-6 items-center">
        {souls.map((soul: Soul) => (
          <UserCard key={soul.id} soul={soul} openModal={openModal}/>
        ))}
      </div>
    </div>
    </>
  )
}
