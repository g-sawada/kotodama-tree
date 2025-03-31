import { EmblaOptionsType } from 'embla-carousel';
import { Pathway } from "@/types/pathway";
import PortalButtonCarousel from "./PortalButtonCarousel";
import Portal from './Portal';

/**
 * @param thisRoomId 
 * @param pathways {Pathway[]} 
 * @returns React.ReactNode
 */

type Props = {
  thisRoomId: string;
  pathways: Pathway[];
};

export default async function PortalButtonComponent({
    thisRoomId,
    pathways
  }: Props) {
  //カルーセルに渡すオプション
  const emblaOptions: EmblaOptionsType = { dragFree: true } 
  
  return (
    <>
      <PortalButtonCarousel options={emblaOptions}>
        {pathways.map((pathway: Pathway) => (
          <Portal key={pathway.id} thisRoomId={thisRoomId} pathway={pathway} />
        ))}
      </PortalButtonCarousel>
    </>
  );
}