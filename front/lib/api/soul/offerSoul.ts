export const offerSoul = async (soul_id: number, captured_tree_id: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/${process.env.NEXT_PUBLIC_API_VERSION}/souls/offer?soul_id=${soul_id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        soul: {
          captured_tree_id: captured_tree_id,
        },
      }),
      cache: "no-cache",
    }
  );
  return response.json();
};
