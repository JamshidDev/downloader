
import MenuRouteModel from "../models/menuRouteModel.js";
const index = async(req,res)=>{
    try{
        let page = req.query.page || 1;
        let per_page = req.query?.per_page || 10;
        let sort = req.query?.sort || 1;
        let search = req.query?.search || "";
        let totalItem = 0;

        totalItem = await MenuRouteModel.countDocuments({active:true, name: { $regex: search, $options: "i" },})
        let result = await MenuRouteModel.find({active:true, name: { $regex: search, $options: "i" },})
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
        let existItem = await MenuRouteModel.findOne({name:data?.name});
        if(!existItem){
            let result = await MenuRouteModel.create(data)
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
        let data = req.body;
        let menuRouteId = req.params.route_id;
        let result = await MenuRouteModel.findByIdAndUpdate(menuRouteId, data);
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
        let menuRouteId =req.params.route_id;
        let result = await MenuRouteModel.updateOne({
            _id:menuRouteId,
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