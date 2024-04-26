import PermissionModel from "../models/permissionModel.js";

const index = async(req,res)=>{
    try{
        let page = req.query.page || 1;
        let per_page = req.query?.per_page || 10;
        let sort =parseInt(req.query?.sort || 1);
        let search = req.query?.search || "";
        let totalItem = 0;

        totalItem = await PermissionModel.countDocuments({active:true, name: { $regex: search, $options: "i" },})
        let result = await PermissionModel.find({active:true, name: { $regex: search, $options: "i" },})
            .select(`_id name`)
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
        let {name} = req.body;
        let existItem = await PermissionModel.findOne({name, active:true});
        if(!existItem){
            let items = [
                {name:`${name}-get`},
                {name:`${name}-store`},
                {name:`${name}-update`},
                {name:`${name}-delete`},
            ]
            let result = await PermissionModel.insertMany(items);
            res.status(200).json({
                success:true,
                message: "Successfully created",
                data:result,
            })
        }else{
            res.status(400).json({
                success:false,
                message: "Already exist item",
            })
        }

    }catch (error){
        console.log(error.message)
        res.status(500).json({
            success:false,
            message: error.message,
        })
    }
}
const update = async(req,res)=>{
    try{
        let {name} = req.body;
        let permission_id = req.params.permission_id;
        let result = await PermissionModel.findByIdAndUpdate(permission_id, {
            name,
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
        let permission_id =req.params.permission_id;
        let result = await PermissionModel.updateOne({
            _id:permission_id,
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

export {store, index,update, delete_item};