import { getUserBookmarkedGags } from "./getUserBookmarkedGags";

export const getTheNumberOfUserBookmarkedGags = async (userId: string): Promise<number> => {
    try{
        const number = (await getUserBookmarkedGags(userId)).length;

        console.log(number)

        if(!number) return 0;

        return number;
    }catch(err){
        throw err;
    }
}