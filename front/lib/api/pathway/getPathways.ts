export const getPathwaysByRoomUuid = async (room_uuid: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/${process.env.NEXT_PUBLIC_API_VERSION}/pathways?room_uuid=${room_uuid}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-cache",
    }
  );
  return res.json();
};
