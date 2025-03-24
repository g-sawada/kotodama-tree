import SoulCard from "../../../../components/ui/SoulCard/SoulCard";
import { Soul } from "@/types";

type Props = {
  soul: Soul;
};

export default function UserCard({ soul }: Props) {
  return (
    <SoulCard soul={soul}>
      <div className="flex justify-between">
        <p className="text-gray-700 text-md">
          しゅうかくされたかいすう
          <span className="ml-2 font-bold">5</span>
        </p>
      </div>
    </SoulCard>
  );
}
