import {StreamChat} from "stream-chat"
import dotenv from "dotenv"

dotenv.config()

const apiKey=process.env.STREAM_API_KEY
const apiSecret= process.env.STREAM_API_SECRET

if(!apiKey || !apiSecret){
    console.log("Stream API OR secret is missing");
}

const streamClient= StreamChat.getInstance(apiKey,apiSecret);

export const upsertcreateStreamUser = async (userData)=>{
    try {
        await streamClient.upsertUser(userData);
        return userData

    } catch (error) {
        console.log("error while creating stream user:",error);
    }
}

export const generateStreamToken=(userId)=>{
try {
    //ensure userId is a.    string
    const userIdStr=userId.toString();
    return streamClient.createToken(userIdStr);
    
    
} catch (error) {
    
}
}