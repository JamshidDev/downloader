import mongoose from "mongoose"
import RoleModel from "./roleModel.js";
import {raw} from "express";

const permissionSchema = mongoose.Schema({
    name: {
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

permissionSchema.pre("updateOne", async function (next) {
    let permission_id = this._conditions._id;

    let existCount = await RoleModel.countDocuments(
        {
            permissions_list: {$in: permission_id},
            active: true
        }
    );
    if (existCount > 0) {
        return next(new Error('Bu permissionga biriktirilga rollar mavjud!'));
    } else {
        return next()
    }
})


const PermissionModel = mongoose.model('PermissionModel', permissionSchema);

export default PermissionModel;