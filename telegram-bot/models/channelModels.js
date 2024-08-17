import mongoose from "mongoose"


const channelSchema = mongoose.Schema({
    telegramId: {
        type: Number,
        default:null,
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
        default:null,
    },
    type: {
        type: String,
    },
    channelLink:{
        type: String,
        default:null,
    },
    newChat:{
        type: Object,
        default:null,
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