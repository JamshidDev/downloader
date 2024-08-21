import MovieModel from "../models/movieModel.js";
import UserModel from "../models/userModels.js";

const dashboardBot = async ()=>{
    try {

        let today = new Date().toLocaleDateString("sv-SE");
        const startDate = new Date(today);
        const endDate = new Date(today);
        endDate.setDate(startDate.getDate() + 1)


        let todayUsers= await UserModel.find({
            created_at: {
                $gte: startDate,
                $lte: endDate,
            },
            active:true,
        }).countDocuments();
        let todayMovies= await MovieModel.find({
            created_at: {
                $gte: startDate,
                $lte: endDate,
            },
            active:true,
        }).countDocuments();

        const allUsers = await UserModel.find({active:true}).countDocuments()
        const allMovies = await MovieModel.find({active:true}).countDocuments()

        return {
            status: true,
            data:{
                allUsers,
                allMovies,
                todayUsers,
                todayMovies,
            },
            msg:null,
        }

    }catch (error){
        return {
            status: false,
            data:null,
            msg:"Server error",
        }
    }
}

export default {dashboardBot}