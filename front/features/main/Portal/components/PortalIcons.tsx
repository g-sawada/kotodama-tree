import React from "react";

type Props = {
  color: string;
};

//  Triangle
export function PI_Triangle({ color }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="64"
      height="64"
      viewBox="0 0 24 24"
      fill={color}
      filter="url(#filter)"
    >
      <path d="M21,21H3L12,3Z"></path>
      <filter id="filter">
        <feComponentTransfer result="color"></feComponentTransfer>

        <feFlood x="2" y="2" width="1" height="1" />
        <feComposite in2="" width="2" height="2" />
        <feTile />

        <feComposite in="color" in2="" operator="in" />

        <feMorphology operator="dilate" radius="2" />
      </filter>
    </svg>
  );
}

//  Star
export function PI_Star({ color }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="64"
      height="64"
      viewBox="0 0 32 32"
      fill={color}
      filter="url(#filter)"
    >
      <path d="M3.488 13.184l6.272 6.112-1.472 8.608 7.712-4.064 7.712 4.064-1.472-8.608 6.272-6.112-8.64-1.248-3.872-7.808-3.872 7.808z"></path>
      <filter id="filter">
        <feComponentTransfer result="color"></feComponentTransfer>

        <feFlood x="2" y="2" width="1" height="1" />
        <feComposite in2="" width="2" height="2" />
        <feTile />

        <feComposite in="color" in2="" operator="in" />

        <feMorphology operator="dilate" radius="2" />
      </filter>
    </svg>
  );
}

//  Pentagon
export function PI_Pentagon({ color }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="64"
      height="64"
      viewBox="0 0 24 24"
      fill={color}
      filter="url(#filter)"
    >
      <path d="M21.6,9.2l-9-6.5c-0.4-0.3-0.8-0.3-1.2,0l-9,6.5C2.1,9.4,1.9,9.9,2,10.3l3.4,10.6c0.1,0.4,0.5,0.7,1,0.7h11.1c0.4,0,0.8-0.3,1-0.7L22,10.3C22.1,9.9,21.9,9.4,21.6,9.2z"></path>
      <filter id="filter">
        <feComponentTransfer result="color"></feComponentTransfer>

        <feFlood x="2" y="2" width="1" height="1" />
        <feComposite in2="" width="2" height="2" />
        <feTile />

        <feComposite in="color" in2="" operator="in" />

        <feMorphology operator="dilate" radius="2" />
      </filter>
    </svg>
  );
}

//  Square
export function PI_Square({ color }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="64"
      height="64"
      viewBox="-2.24 -2.24 20.48 20.48"
      fill={color}
      filter="url(#filter)"
    >
      <path d="M3.25 1A2.25 2.25 0 001 3.25v9.5A2.25 2.25 0 003.25 15h9.5A2.25 2.25 0 0015 12.75v-9.5A2.25 2.25 0 0012.75 1h-9.5z"></path>
      <filter id="filter">
        <feComponentTransfer result="color"></feComponentTransfer>

        <feFlood x="2" y="2" width="1" height="1" />
        <feComposite in2="" width="2" height="2" />
        <feTile />

        <feComposite in="color" in2="" operator="in" />

        <feMorphology operator="dilate" radius="2" />
      </filter>
    </svg>
  );
}

//  Diamond
export function PI_Diamond({ color }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="64"
      height="64"
      viewBox="-2.24 -2.24 20.48 20.48"
      fill={color}
      filter="url(#filter)"
    >
      <path d="M7 16H9L16 9V7L9 0H7L0 7V9L7 16Z"></path>
      <filter id="filter">
        <feComponentTransfer result="color"></feComponentTransfer>

        <feFlood x="2" y="2" width="1" height="1" />
        <feComposite in2="" width="2" height="2" />
        <feTile />

        <feComposite in="color" in2="" operator="in" />

        <feMorphology operator="dilate" radius="2" />
      </filter>
    </svg>
  );
}

//  Crown
export function PI_Crown({ color }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="64"
      height="64"
      viewBox="-3.36 -3.36 30.72 30.72"
      fill={color}
      filter="url(#filter)"
    >
      <path d="M12.8306 3.443C12.6449 3.16613 12.3334 3 12.0001 3C11.6667 3 11.3553 3.16613 11.1696 3.443L7.38953 9.07917L2.74781 3.85213C2.44865 3.51525 1.96117 3.42002 1.55723 3.61953C1.15329 3.81904 0.932635 4.26404 1.01833 4.70634L3.70454 18.5706C3.97784 19.9812 5.21293 21 6.64977 21H17.3504C18.7872 21 20.0223 19.9812 20.2956 18.5706L22.9818 4.70634C23.0675 4.26404 22.8469 3.81904 22.4429 3.61953C22.039 3.42002 21.5515 3.51525 21.2523 3.85213L16.6106 9.07917L12.8306 3.443Z"></path>
      <filter id="filter">
        <feComponentTransfer result="color"></feComponentTransfer>

        <feFlood x="2" y="2" width="1" height="1" />
        <feComposite in2="" width="2" height="2" />
        <feTile />

        <feComposite in="color" in2="" operator="in" />

        <feMorphology operator="dilate" radius="2" />
      </filter>
    </svg>
  );
}

//  FourPointedStar
export function PI_FourPointedStar({ color }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="64"
      height="64"
      viewBox="-30.72 -30.72 317.44 317.44"
      fill={color}
      filter="url(#filter)"
    >
      <path d="M240.58984,128a15.84794,15.84794,0,0,1-10.53125,15.03711l-63.81543,23.206-23.206,63.81543a16.001,16.001,0,0,1-30.07422,0L89.75684,166.24316l-63.81543-23.206a16.001,16.001,0,0,1,0-30.07422L89.75684,89.75684l23.20605-63.81543a16.001,16.001,0,0,1,30.07422,0l23.206,63.81543,63.81543,23.20605A15.84794,15.84794,0,0,1,240.58984,128Z"></path>
      <filter id="filter">
        <feComponentTransfer result="color"></feComponentTransfer>

        <feFlood x="2" y="2" width="1" height="1" />
        <feComposite in2="" width="2" height="2" />
        <feTile />

        <feComposite in="color" in2="" operator="in" />

        <feMorphology operator="dilate" radius="2" />
      </filter>
    </svg>
  );
}

//  Drop
export function PI_Drop({ color }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="64"
      height="64"
      viewBox="-3.2 -3.2 38.40 38.40"
      fill={color}
      filter="url(#filter)"
    >
      <path d="M25.378 19.75c1.507 6.027-3.162 11.25-9.375 11.25s-10.9-5.149-9.375-11.25c0.937-3.75 5.625-9.375 9.375-18.75 3.75 9.374 8.438 15 9.375 18.75z"></path>
      <filter id="filter">
        <feComponentTransfer result="color"></feComponentTransfer>

        <feFlood x="2" y="2" width="1" height="1" />
        <feComposite in2="" width="2" height="2" />
        <feTile />

        <feComposite in="color" in2="" operator="in" />

        <feMorphology operator="dilate" radius="2" />
      </filter>
    </svg>
  );
}

//  Hexagon
export function PI_Hexagon({ color }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="64"
      height="64"
      viewBox="-2.24 -2.24 20.48 20.48"
      fill={color}
      filter="url(#filter)"
    >
      <path d="M9.166.33a2.25 2.25 0 00-2.332 0l-5.25 3.182A2.25 2.25 0 00.5 5.436v5.128a2.25 2.25 0 001.084 1.924l5.25 3.182a2.25 2.25 0 002.332 0l5.25-3.182a2.25 2.25 0 001.084-1.924V5.436a2.25 2.25 0 00-1.084-1.924L9.166.33z"></path>
      <filter id="filter">
        <feComponentTransfer result="color"></feComponentTransfer>

        <feFlood x="2" y="2" width="1" height="1" />
        <feComposite in2="" width="2" height="2" />
        <feTile />

        <feComposite in="color" in2="" operator="in" />

        <feMorphology operator="dilate" radius="2" />
      </filter>
    </svg>
  );
}

//  InvertedTriangle
export function PI_InvertedTriangle({ color }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="64"
      height="64"
      viewBox="-6.08 -6.08 44.16 44.16"
      fill={color}
      filter="url(#filter)"
    >
      <path d="M31.92,5.021l-14.584,22.5c-0.089,0.138-0.241,0.223-0.406,0.229c-0.004,0-0.009,0-0.014,0 c-0.16,0-0.312-0.076-0.404-0.205L0.096,5.044C-0.015,4.893-0.031,4.69,0.054,4.523C0.139,4.354,0.312,4.25,0.5,4.25h31 c0.183,0,0.352,0.1,0.438,0.261C32.026,4.67,32.019,4.867,31.92,5.021z"></path>
      <filter id="filter">
        <feComponentTransfer result="color"></feComponentTransfer>

        <feFlood x="2" y="2" width="1" height="1" />
        <feComposite in2="" width="2" height="2" />
        <feTile />

        <feComposite in="color" in2="" operator="in" />

        <feMorphology operator="dilate" radius="2" />
      </filter>
    </svg>
  );
}
