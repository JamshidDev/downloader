
import mongoose from "mongoose"

const permissionSchema = mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    active: {
        type: Boolean,
        default: true,
    },
}, {
    timestamps: {
        createdAt: "created_at", // Use `created_at` to store the created date
        updatedAt: "updated_at", // and `updated_at` to store the last updated date
    },
});


const PermissionModel = mongoose.model('PermissionModel', permissionSchema);

export default  PermissionModel;