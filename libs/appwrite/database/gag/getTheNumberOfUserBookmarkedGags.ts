import { getUserBookmarkedGags } from "./getUserBookmarkedGags";

export const getTheNumberOfUserBookmarkedGags = async (userId: string): Promise<number> => {
    try{
        return (await getUserBookmarkedGags(userId)).length;
    }catch(err){
        throw err;
    }
}