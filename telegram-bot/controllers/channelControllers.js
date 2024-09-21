
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
        console.log(error)
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

const removeChannel = async(id)=>{
    try{
        await ChannelModels.findByIdAndUpdate(id,{
            active:false,
            channelLink:null,
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


export default {store, remove, index, adminChannels, updateStatus,removeChannel}