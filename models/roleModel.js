import mongoose, {Schema} from "mongoose";

const roleSchema = mongoose.Schema({
        name: {
            type: String,
            required: true,
        },
        permissions_list: {
            type: [{ type: Schema.Types.ObjectId, ref: 'PermissionModel'}],
            default: [],
        },
        active: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: {
            createdAt: "created_at",
            updatedAt: "updated_at",
        },
    }
);

const RoleModel = mongoose.model('RoleModel', roleSchema);

export default  RoleModel;