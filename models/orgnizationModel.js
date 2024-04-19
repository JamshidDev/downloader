import mongoose from "mongoose";

const organizationSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    parentId:{
        type:Number,
        default:null,
    },
    active:{
        type:Boolean,
        default: true,
    }
},{
    timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at",
    },
});


const OrganizationModel = mongoose.model('OrganizationModel',organizationSchema );
export default OrganizationModel;