import mongoose from "mongoose";

const adminScheme = mongoose.model({
    fullname:{
        type:String,
        required:true,
    },
    login:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    permission:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'RoleModel'
    },
    active: {
        type: Boolean,
        default: true,
    },
},{
        timestamps: {
            createdAt: "created_at", // Use `created_at` to store the created date
            updatedAt: "updated_at", // and `updated_at` to store the last updated date
        },
    }
    );


const AdminModel = mongoose.model('AdminModel', adminScheme);

export  default  AdminModel;
