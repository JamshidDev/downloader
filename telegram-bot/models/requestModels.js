
import mongoose from "mongoose"

const requestSchema = mongoose.Schema({
    channelId:{
        type:Number,
        required:true,
    },
    userId:{
        type:Number,
        required:true,
    },
    active: {
        type: Boolean,
        default: true,
    }
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at' ,
    }
})

const RequestModel = mongoose.model("RequestModel",requestSchema);

export default  RequestModel;