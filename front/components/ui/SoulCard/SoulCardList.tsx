import { Soul } from "@/types/soul";
import SoulCard from "./SoulCard";

type Props = {
  souls: Soul[];
  setSelectedSoul: (soul: Soul) => void;
};

export default function SoulCardList({ souls, setSelectedSoul }: Props) {
  return (
    <>
      <div className="mx-auto w-full">
        <div className="flex flex-col gap-6 items-center">
          {souls.map((soul: Soul) => (
            <SoulCard
              key={soul.id}
              soul={soul}
              setSelectedSoul={setSelectedSoul}
            />
          ))}
        </div>
      </div>
    </>
  );
}
