import RequestModels from "../models/requestModels.js";


const store = async (data) => {
    try {
        let exist_user = await RequestModels.findOne({channelId:data.channelId,userId:data.userId}).exec();
        if (!exist_user) {
            await RequestModels.create(data)
        }
        return {
            success:true,
            message: "Successfully created or updated",
        }
    } catch (error) {
        console.log(error)
        return {
            success:false,
            message: error,
        }
    }
}

const userSendJoinRequest = async (channelId, userId)=>{
    try{
        let exist_user = await RequestModels.findOne({userId, channelId}).exec()
        return {
            success:true,
            joinRequest:Boolean(exist_user),
            message: null,
        }
    }catch (error){
        console.log(error)
        return {
            success:false,
            message: error,
        }
    }
}

const deleteChannelRequest = async (channelId)=>{
    try {
        console.log(channelId)
        await RequestModels.deleteMany({channelId})
        return {
            success:true,
            message: null,
        }
    }catch (error){
        console.log(error)
        return {
            success:false,
            message: error,
        }
    }
}


export default {
    store,
    userSendJoinRequest,
    deleteChannelRequest
}