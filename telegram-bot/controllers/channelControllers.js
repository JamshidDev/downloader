
import ChannelModels from "../models/channelModels.js";


const store = async (data) => {
    try {

        if(!data.telegramId){
            await ChannelModels.create(data);
            return {
                success:true,
                message: "Successfully created or updated",
            }
        }

        const existChannel =await ChannelModels.findOne({telegram_id:data.telegramId});
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
        await ChannelModels.deleteOne({telegramId:id},{
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

const index = async(active, ad)=>{
    try{
        const list = await ChannelModels.find({
            active:active,
            ad:ad,
        })
        return {
            success:true,
            data:list,
            message: null,
        }
    }catch (error){
        console.log(error)
        return {
            success:false,
            data:[],
            message: "server error",
        }

    }
}
const adminChannels = async()=>{
    try{
        const list = await ChannelModels.find({
            active:true,
        })
        return {
            success:true,
            data:list,
            message: null,
        }
    }catch (error){
        return {
            success:false,
            data:[],
            message: "server error",
        }

    }
}

const updateStatus = async(id, ad)=>{
    try{
        await ChannelModels.findByIdAndUpdate(id,{
            ad,
        })
        const list = await ChannelModels.find({
            active:true,
        })

        return {
            success:true,
            data:list,
            message: null,
        }
    }catch (error){
        console.log(error)
        return {
            success:false,
            data:[],
            message: "server error",
        }

    }
}

const removeChannel = async(_id)=>{
    try{
        await ChannelModels.deleteOne({_id})
        const list = await ChannelModels.find({
            active:true,
        })

        return {
            success:true,
            data:list,
            message: null,
        }
    }catch (error){
        console.log(error)
        return {
            success:false,
            data:[],
            message: "server error",
        }

    }
}

const privateChannels = async()=>{
    try{
        const list = await ChannelModels.find({
            active:true,
            type:"PrivateChannel"
        })
        return {
            success:true,
            data:list,
            message: null,
        }
    }catch (error){
        return {
            success:false,
            data:[],
            message: "server error",
        }

    }
}

const updatePrivateChannelLink = async(id, channelLink)=>{
    try{
        let result = await ChannelModels.findByIdAndUpdate(id,{
            channelLink,
        })

        console.log(result)

        return {
            success:true,
            message: null,
        }
    }catch (error){
        return {
            success:false,
            data:[],
            message: "server error",
        }

    }
}


export default {store, remove, index, adminChannels, updateStatus,removeChannel, privateChannels, updatePrivateChannelLink}