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
        <feComponentTransfer result="color">
          <feFuncR type="discrete" tableValues="0,0.5,1" />
          <feFuncG type="discrete" tableValues="0,0.5,1" />
          <feFuncB type="discrete" tableValues="0,0.5,1" />
        </feComponentTransfer>

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
        <feComponentTransfer result="color">
          <feFuncR type="discrete" tableValues="0,0.5,1" />
          <feFuncG type="discrete" tableValues="0,0.5,1" />
          <feFuncB type="discrete" tableValues="0,0.5,1" />
        </feComponentTransfer>

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
        <feComponentTransfer result="color">
          <feFuncR type="discrete" tableValues="0,0.5,1" />
          <feFuncG type="discrete" tableValues="0,0.5,1" />
          <feFuncB type="discrete" tableValues="0,0.5,1" />
        </feComponentTransfer>

        <feFlood x="2" y="2" width="1" height="1" />
        <feComposite in2="" width="2" height="2" />
        <feTile />

        <feComposite in="color" in2="" operator="in" />

        <feMorphology operator="dilate" radius="2" />
      </filter>
    </svg>
  );
}
