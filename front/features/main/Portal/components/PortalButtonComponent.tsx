import { EmblaOptionsType } from 'embla-carousel';
import { Pathway } from "@/types/pathway";
import { getPathwaysByRoomUuid } from "@/lib/api/pathway/getPathways";
import PortalButtonCarousel from "./PortalButtonCarousel";
import Portal from './Portal';

export default async function PortalButtonComponent() {
  const thisRoomUuid = "room1" // テスト用に設置
  const pathways = await getPathwaysByRoomUuid(thisRoomUuid)
  const emblaOptions: EmblaOptionsType = { dragFree: true } //カルーセルに渡すオプション
  return (
    <>
        <PortalButtonCarousel options={emblaOptions}>
          {pathways.map((pathway: Pathway) => (
            <Portal key={pathway.id} thisRoomUuid={thisRoomUuid} pathway={pathway} />
          ))}
        </PortalButtonCarousel>

    </>
  );
}