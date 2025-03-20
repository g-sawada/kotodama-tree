import { Soul, User, Favorite } from "@/types";

type Props = {
  soul: Soul[];
  ownersouls: Soul[];
  user: User;
  favorites: Favorite[];
  openModal: (soul: Soul[], ownersouls: Soul[], user: User, favorites: Favorite[]) => void;
};

export default function PerformanceCard({ soul, ownersouls, user, favorites }: Props) {
  return (
    <>
    <div onClick={() => openModal(soul, ownersouls, user, favorites)}>
      <div>ユーザーレベル{user.level}</div>
      <div>そうしゅうかく数{ownersouls}</div>
      <div>いいね数{favorites}</div>
      <div>ささげた回数{soul}</div>
    </div>
    </>
  );
}
