import { Soul } from "@/types/soul";
import SoulCard from "@/components/ui/SoulCard/SoulCard";

type Props = {
  souls: Soul[];
  openModal: (soul: Soul) => void;
};

export default function SoulCardList({ souls, openModal }: Props) {
  
  return (
    <>
    <div className="mx-auto w-full">
      <div className="flex flex-col gap-6 items-center">
        {souls.map((soul: Soul) => (
          <SoulCard key={soul.id} soul={soul} handleCardClick={() => openModal(soul)}>
            <div className="flex justify-between">
              <p className="text-gray-700 text-md">
                しゅうかくされたかいすう
                <span className="ml-2 font-bold">{soul.harvested_count}</span>
              </p>
            </div>
          </SoulCard>
        ))}
      </div>
    </div>
    </>
  )
}
