import RoleModel from "../models/roleModel.js";


const store = async(req,res)=>{
    try{
        let { name, permissions_list } = req.body;
        let result = await RoleModel.create({
            name,
            permissions_list,
        })

        return {
            success:true,
            message: "Successfully created",
        }
    }catch (error){
        console.log(error)
        return {
            success:false,
            message: error,
        }
    }
}

export default {store};