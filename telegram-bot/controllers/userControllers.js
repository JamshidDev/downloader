
import UserModels from "../models/userModels.js";

const store = async (data) => {
    try {
        let exist_user = await UserModels.findOne({ telegramId: data.telegramId }).exec();
        if (!exist_user) {
            await UserModels.create(data)
        } else {
            await UserModels.findByIdAndUpdate(exist_user._id, data);
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

const remove = async (telegramId) => {
    try {
        let exist_user = await UserModels.findOne({ telegramId }).exec();
        if (exist_user) {
            await UserModels.findByIdAndUpdate(exist_user._id, {
                active: false,
            });
        }
        return {
            success:true,
            message: "Successfully removed",
        }
    } catch (error) {
        console.log(error)
        return {
            success:false,
            message: error,
        }

    }
}

const allUser = async ()=>{
    try {
        let users = await UserModels.find({active:true},{}, { enableUtf8Validation: false }).exec();
        return {
            status:true,
            data:users,
            message: "Successfully removed",
        }
    } catch (error) {
        return {
            status:false,
            data:[],
            message: error,
        }

    }
}

export default {store, remove, allUser}