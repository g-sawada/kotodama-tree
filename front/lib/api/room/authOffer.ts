export const authOffer = async (room_uuid: string, user_uuid: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/${process.env.NEXT_PUBLIC_API_VERSION}/rooms/${room_uuid}/auth_offer?user_uuid=${user_uuid}`,
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
