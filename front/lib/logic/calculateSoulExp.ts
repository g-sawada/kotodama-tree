import { Soul } from "@/types/soul";
import * as Constants from "@/constants";

export const calculateSoulExp = (soul: Soul): number => {
  const exp = soul.harvested_count * Constants.COEF_HARVESTED_COUNT  
              + soul.favorites.length * Constants.COEF_FAVORITES_COUNT;
  return exp;
}
