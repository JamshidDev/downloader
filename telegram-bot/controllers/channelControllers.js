
import ChannelModels from "../models/channelModels.js";


const store = async (data) => {
    try {
        const existChannel =await ChannelModels.findOne({telegram_id:data.telegram_id});
        if(existChannel){
            data.active = true;
            await ChannelModels.findByIdAndUpdate(existChannel._id, data);
        }else{
            await ChannelModels.create(data);
        }
        return {
            success:true,
            message: "Successfully created or updated",
        }
    } catch (error) {
        return {
            success:false,
            message: error,
        }
    }
}

const remove = async (id) => {
    try {
        await ChannelModels.updateOne({telegramId:id},{
            active:false,
            ad:false
        })
        return {
            success:true,
            message: "Successfully removed",
        }
    } catch (error) {
        return {
            success:false,
            message: error,
        }
    }
}


export default {store, remove}