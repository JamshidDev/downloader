
import mongoose from "mongoose"

const userSchema = mongoose.Schema({
    telegramId:{
        type:Number,
        required:true,
    },
    firstname:{
        type:String,
        required:true,
    },
    lastname:{
        type:String,
        default:null,
    },
    username:{
        type:String,
        default:null,
    },
    phone:{
        type:String,
        default:null,
    },
    languageCode:{
        type:String,
        default:null,
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

const UserModel = mongoose.model("UserModel",userSchema);

export default  UserModel;