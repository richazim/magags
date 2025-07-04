export const validateFile = function(fileType: string){
    if(fileType === "image" || fileType === "video"){
        return fileType;
    }else{
        throw new Error("Invalid file type");
    }
}