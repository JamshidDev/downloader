
import mongoose, {Schema} from "mongoose";

const numberType = {
    type:Number,
    default:null
}
const menuSchema = mongoose.Schema({
    parentId:numberType,
    childId:numberType,
    route:{
        type:Schema.Types.ObjectId,
        ref:"menuRouteModel"
    },


})