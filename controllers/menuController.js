
import MenuModel from "../models/menuModel.js";
const index = async(req,res)=>{
    try{
        let page = req.query.page || 1;
        let per_page = req.query?.per_page || 10;
        let sort = req.query?.sort || 1;
        let search = req.query?.search || "";
        let totalItem = 0;
        let roleId = req.params.role_id;

        let allMenu = await MenuModel({
            active:true,
            roleId
        });

        console.log(allMenu)

        totalItem = await MenuModel.countDocuments({active:true, name: { $regex: search, $options: "i" },})
        let result = await MenuModel.find({active:true, name: { $regex: search, $options: "i" },})
            .populate("routeId")
            .populate("roleId")
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
        let data = req.body;
        let existItem = await MenuModel.findOne({name:data?.name});
        if(!existItem){
            let result = await MenuModel.create(data)
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
        let data= req.body;
        let menuId = req.params.menu_id;
        let result = await MenuModel.findByIdAndUpdate(menuId, data);
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
        let menuId =req.params.menu_id;
        let result = await MenuModel.updateOne({
            _id:menuId,
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