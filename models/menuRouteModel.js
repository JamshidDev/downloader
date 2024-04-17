import mongoose from "mongoose";

const stringTypeWithRequired = {
    type: String,
    required: true,
}
const stringType = {
    type: String,
    default: null
}
const boolingType = {
    type: Boolean,
    default: false,
}

const menuRouteSchema = mongoose.Schema({
        name: stringTypeWithRequired,
        icon: stringTypeWithRequired,
        route: stringTypeWithRequired,
        status: boolingType,
        statusText: stringType,
        active:boolingType,
    },
    {
        timestamps: {
            createdAt: "created_at", // Use `created_at` to store the created date
            updatedAt: "updated_at", // and `updated_at` to store the last updated date
        },
    }
);

const menuRouteModel = mongoose.model('menuRouteModel', menuRouteSchema);

export default  menuRouteModel;