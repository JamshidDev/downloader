import OrganizationModel from "../models/orgnizationModel.js";

const index = async(req,res)=>{
    try{
        let page = req.query.page || 1;
        let per_page = req.query?.per_page || 10;
        let sort = req.query?.sort || 1;
        let search = req.query?.search || "";
        let totalItem = 0;

        totalItem = await OrganizationModel.countDocuments({active:true, name: { $regex: search, $options: "i" },})
        let result = await OrganizationModel.find({active:true, name: { $regex: search, $options: "i" },})
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
        let existItem = await OrganizationModel.findOne({name:data?.name, active:true});
        if(!existItem){
            let result = await OrganizationModel.create(data);
            res.status(200).json({
                success:true,
                message: "Successfully created",
                data:result
            })
        }else{
            res.status(200).json({
                success:false,
                message: "Already exist item",
            })
        }


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
        let organization_id = req.params.organization_id;
        let result = await OrganizationModel.findByIdAndUpdate(organization_id, {
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
        let organization_id =req.params.organization_id;
        let result = await OrganizationModel.updateOne({
            _id:organization_id,
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