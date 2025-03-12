import { Soul } from "@/types/soul";


type Props = {
  soul: Soul;
  openModal: (soul: Soul) => void;
};

export default function UserCard({ soul, openModal }: Props) {
  return (
    <>
    <div className="w-full rounded-lg overflow-hidden shadow-[0px_0px_5px_2px_#66e8f9] bg-cyan-300 hover:cursor-pointer" onClick={() => openModal(soul)}>
      <div className="px-6 py-4">
        <div className="font-bold text-gray-700 text-xl mb-2">
          {soul.content}
        </div>
        <div className="flex justify-between">
          <p className="text-gray-700 text-md">しゅうかくされたかいすう</p>
        </div>
      </div>
    </div>
    </>
);
}
