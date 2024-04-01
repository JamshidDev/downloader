
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

export default {store, remove}