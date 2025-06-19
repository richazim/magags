import { searchVideosByTitle } from "@/libs/appwrite/database/gag/searchVideosByTitle";
import { useAppwriteQuery } from "./useAppwriteQuery";

export function useSearchResults(title: string | string[]) {
  const { data, refetch } = useAppwriteQuery(() => searchVideosByTitle(typeof title === "string" ? title : title[0]));

  // useEffect(() => {     Pas besoin ici vu que useAppwriteQuery fait déja le rafraichissement à chaque rendu
  //   refetch();
  // }, []);  

  return { data, refetch };
}
