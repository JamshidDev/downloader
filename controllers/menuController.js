import MenuModel from "../models/menuModel.js";

const index = async(req,res)=>{
    try{
        let page = req.query.page || 1;
        let per_page = req.query?.per_page || 10;
        let sort =parseInt(req.query?.sort || 1);
        let search = req.query?.search || "";
        let totalItem = 0;
        let roleId = req.params.role_id;
        let allMenu = await MenuModel.find({active:true,roleId})
            .populate('routeId', '-_id -__v -created_at -updated_at')
            .populate('roleId', 'name _id');

        let parentRoutes = allMenu.filter((item)=>item.parentId === null);
        let subRoutes = allMenu.filter((item)=>item.parentId !== null);

        parentRoutes.sort((a, b) => a.order - b.order);
        subRoutes.sort((a, b) => a.order - b.order);

        let menuList = [];
        for(let item of parentRoutes){
            if(!item.subMenu){
                let children = subRoutes.filter((subItem) => subItem.parentId == item._id)
                    .map((a)=>({
                        _id:a._id,
                        name:a.name,
                        parentId:a.parentId,
                        route:a.routeId?.route,
                        icon:a.routeId?.icon,
                        status:a.routeId?.status,
                        statusText:a.routeId?.statusText,
                        order:a.order,
                    }))

                let field = {
                    name:item.name,
                    status:item.routeId.status,
                    statusText:item.routeId.statusText,
                    icon:item.routeId.icon,
                    order:item.order,
                    children:children,
                }
                menuList.push(field)
            }else{
                let field = {
                    name:item.name,
                    status:item.routeId.status,
                    route:item.routeId.route,
                    statusText:item.routeId.statusText,
                    icon:item.routeId.icon,
                    order:item.order,
                    children:[],
                }
                menuList.push(field)
            }

        }

        res.status(200).json({
            success:true,
            menus:menuList
        })
    }catch (error){
        console.log(error)
        res.status(500).json({
            success:false,
            message: error.message,
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