import RoleModel from "../models/roleModel.js";
import PermissionModel from "../models/permissionModel.js";

const index = async(req,res)=>{
    try{
        let page = req.query.page || 1;
        let per_page = req.query?.per_page || 10;
        let sort =parseInt(req.query?.sort || 1);
        let search = req.query?.search || "";
        let totalItem = 0;

        totalItem = await RoleModel.countDocuments({active:true, name: { $regex: search, $options: "i" },})
        let result = await RoleModel.find({active:true, name: { $regex: search, $options: "i" },})
            .populate("permissions_list")
            .sort({ created_at:sort })
            .skip((page - 1) * per_page)
            .limit(per_page);

        let permissionList = await PermissionModel.find({
            active:true
        }).select('_id name')

        res.status(200).json({
            success:true,
            roles:{
                totalItem,
                data:result
            },
            permissions:permissionList
        })
    }catch (error){
        console.log(error)
        res.status(500).json({
            success:false,
            message: error,
        })
    }
}

const _create = async(req,res)=>{
    try{
        let page = req.query.page || 1;
        let per_page = req.query?.per_page || 10;
        let sort = req.query?.sort || 1;
        let search = req.query?.search || "";
        let totalItem = 0;

        totalItem = await RoleModel.countDocuments({active:true, name: { $regex: search, $options: "i" },})
        let result = await PermissionModel.find({active:true, name: { $regex: search, $options: "i" },})
            .populate("permissions_list")
            .sort({ created_at: sort })
            .skip((page - 1) * per_page)
            .limit(per_page);

        res.status(200).json({
            success:true,
            data:{
                totalItem,
                data:result
            }
        })
    }catch (error){
        console.log(error)
        res.status(500).json({
            success:false,
            message: error,
        })
    }
}
const store = async(req,res)=>{
    try{
        let { name, permissions_list } = req.body;
        let result = await RoleModel.create({
            name,
            permissions_list,
        })

        res.status(200).json({
            success:true,
            message: "Successfully created",
            data:result
        })
    }catch (error){
        console.log(error)
        res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}
const update = async(req,res)=>{
    try{
        let {name,permissions_list} = req.body;
        let permission_id = req.params.role_id;
        let result = await RoleModel.findByIdAndUpdate(permission_id, {
            name,
            permissions_list,
        });
        res.status(200).json({
            success:true,
            message: "Successfully updated",
            data:result,
        })
    }catch (error){
        console.log(error)
        res.status(500).json({
            success:false,
            message: error,
        })
    }
}
const delete_item = async(req,res)=>{
    try{
        let role_id =req.params.role_id;
        let result = await RoleModel.updateOne({
            _id:role_id,
            active: true,
        }, {
            active: false,
        });
        res.status(200).json({
            success:true,
            message: "Successfully delete",
            data:result,
        })

    }catch (error){
        console.log(error)
        res.status(500).json({
            success:false,
            message: error.message,
        })
    }
}

export  {store,index, update,delete_item};