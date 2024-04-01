import mongoose from "mongoose";

const roleSchema = mongoose.Schema({
        name: {
            type: String,
            required: true,
        },
        permissions_list: {
            type: Array[Object],
            default: [],
        },
        active: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: {
            createdAt: "created_at", // Use `created_at` to store the created date
            updatedAt: "updated_at", // and `updated_at` to store the last updated date
        },
    }
);

const RoleModel = mongoose.model('RoleModel', roleSchema);

export default  RoleModel;