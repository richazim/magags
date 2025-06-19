import { getUserGags } from "./getUserGags";

export const getTheNumberOfUserGags = async (userId: string) => {
    try{
        return (await getUserGags(userId)).length;
    }catch(err){
        throw err;
    }
}