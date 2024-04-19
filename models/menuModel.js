
import mongoose, {Schema} from "mongoose";

const numberType = {
    type:Number,
    default:null
}
const booleanType={
    type:Boolean,
    default:true
}
const stringType = {
    type:String,
    default:null
}

const menuSchema = mongoose.Schema({
    name:stringType,
    parentId:numberType,
    childId:numberType,
    routeId:{
        type:Schema.Types.ObjectId,
        ref:"menuRouteModel",
        required:true,
    },
    roleId:{
        type:Schema.Types.ObjectId,
        ref:"RoleModel",
        required:true,
    },
    order:numberType,
    subMenu:booleanType,
    active:booleanType,
},{
    timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at",
    },
});

const MenuModel = mongoose.model('MenuModel', menuSchema);

export default MenuModel;