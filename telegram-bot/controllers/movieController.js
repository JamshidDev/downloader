import MovieModel from "../models/movieModel.js";

const _create = async (data)=> {
    try {
        await MovieModel.create(data)
        return {
            status: true,
            msg: null
        }
    } catch (err) {
        return {
            status: false,
            msg: err
        }
    }
}

const _getById = async (_id)=>{
    try{
        let existItem = MovieModel.findOne({_id, active:true})
        if(existItem){
            return {
                status: true,
                data:existItem,
                msg:null,
            }
        }else{
            return {
                status: false,
                data:null,
                msg: "Kino topilmadi!"
            }
        }

    }catch (err){
        return {
            status: false,
            data:null,
            msg: "Server xatosi"
        }
    }
}

const _getPagination = async(params)=>{
    try{
      const page = params?.page || 1
      const size = params?.size || 10
      const skip = (page - 1)*size
      const query = params?.search? { movieCode: new RegExp(params?.search, 'i'), active:true } : {active:true}
      const result = await MovieModel.find(query).skip(skip).limit(size)
      const totalItem = await MovieModel.countDocuments(query)
        return {
            status: true,
            data:result,
            totalItem,
        }
    }catch(err){
        return {
            status: false,
            msg: err
        }
    }
}

const _deleteById = async (_id)=>{
    try {
       const existItem = await MovieModel.findOne({
            _id,
            active:true,
        })

        if(existItem){
            await MovieModel.updateOne({_id},{
                active:false
            })
            return {
                status: true,
                msg: null
            }
        }
        return {
            status: false,
            msg: "Idga mos kino topilmadi"
        }
    } catch (err) {
        return {
            status: false,
            msg: "Server xatosi"
        }
    }
}

const _searchMovieByCode =async (code)=>{
    try{
        const movies = await MovieModel.find({movieCode:code, active:true})
        return {
            status: true,
            data:movies,
            msg:null,
        }
    }catch(error){
        return {
            status: false,
            data:[],
            msg: "Server xatosi"
        }
    }
}






export default  {
    _create,
    _deleteById,
    _getById,
    _getPagination,
    _searchMovieByCode,
}
