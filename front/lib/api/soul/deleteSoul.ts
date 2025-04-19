import { FetchResult } from "@/types/fetchResult";
import { deleteFetch } from "../fetcher/deleteFetch";


export const deleteSoul = async ( 
  soulId: number,
): Promise<FetchResult<{ message: string }>> => {
  const url = `/souls/${soulId}`;
  return await deleteFetch<{ message: string }>(url, {});
};
