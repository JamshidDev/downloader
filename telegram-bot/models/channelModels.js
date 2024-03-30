import mongoose from "mongoose"


const channelSchema = mongoose.Schema({
    telegramId: {
        type: Number,
        required: true,
    },
    userId: {
        type: Number,
        required: true,
    },
    title: {
        type: String,
    },
    username: {
        type: String,
    },
    type: {
        type: String,
    },
    newChat:{
        type: Object,
    },
    ad: {
        type: Boolean,
        default: false,
    },
    active: {
        type: Boolean,
        default: true,
    },
}, {
    timestamps: {
        createdAt: 'created_at', // Use `created_at` to store the created date
        updatedAt: 'updated_at' // and `updated_at` to store the last updated date
    }
})

const ChannelModel = mongoose.model("ChannelModel", channelSchema)
 export default  ChannelModel;