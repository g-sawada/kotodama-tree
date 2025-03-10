"use client";

import React from "react";
import { EmblaOptionsType } from "embla-carousel";
import {
  PrevButton,
  NextButton,
  usePrevNextButtons,
} from "./PortalButtonCarouselArrowButtons";
import useEmblaCarousel from "embla-carousel-react";
import "@/styles/embla.css";

type Props = {
  children: React.ReactNode;
  options?: EmblaOptionsType;
};

export default function PortalButtonCarousel({ children, options }: Props) {
  const [emblaRef, emblaApi] = useEmblaCarousel(options);
  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  return (
    <section className="embla z-30">
      <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">{children}</div>
      </div>

      <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
    </section>
  );
}
