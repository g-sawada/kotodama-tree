export const createSoul = async (
  content: string,
  owner_id: string,
  creator_id: string,
  home_tree_id: string,
  captured_tree_id: string
) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/${process.env.NEXT_PUBLIC_API_VERSION}/souls`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        soul: {
          content: content,
          owner_id: owner_id,
          creator_id: creator_id,
          home_tree_id: home_tree_id,
          captured_tree_id: captured_tree_id,
        },
      }),
      cache: "no-cache",
    }
  );
  return response.json();
};
