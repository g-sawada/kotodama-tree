import Image from "next/image";

type Props = {
  image: string;
}

export default function TreeImg({image}: Props) {
  return (
    <Image src={image} alt="tree" width={400} height={400} />
  );
}