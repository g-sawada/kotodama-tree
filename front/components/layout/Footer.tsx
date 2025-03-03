import HoldingSoulsModalController from "@/features/souls/components/HoldingSoulsModalController";
import Image from "next/image"

export default function Footer() {
  return (
    <footer className="flex justify-between w-full text-white border-t flex-none">
      <a href="#" className="flex flex-col items-center flex-1 py-4">
        <Image src="icon_images/footer_item.svg" alt="Icon 1" width={20} height={20} className="mb-1"/>
        <span className="text-[0.5rem] btm-nav-label">アイテム</span>
      </a>
      <a href="#" className="flex flex-col items-center flex-1 py-4">
        <Image src="icon_images/footer_tree.svg" alt="Icon 1" width={20} height={20} className="mb-1"/>
        <span className="text-[0.5rem] btm-nav-label">自分のキ</span>
      </a>
      {/* 自分のキにいるときのモーダル確認のため、isRoomOwnerにtrueを設定 */}
      <HoldingSoulsModalController isRoomOwner={true}/>
    </footer>
  );
}
