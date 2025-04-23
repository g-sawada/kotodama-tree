import { FetchResult } from "@/types/fetchResult";
import { deleteFetch } from "../fetcher/deleteFetch";


export const deleteSoul = async ( 
  soulId: number,
  userId: string
): Promise<FetchResult<{ message: string }>> => {
  const url = `/souls/${soulId}`;
  const reqBody = { user_id: userId };
  return await deleteFetch<{ message: string }>(url, reqBody);
  
};
