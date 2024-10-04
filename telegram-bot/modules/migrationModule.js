import mongoose from "mongoose";
import userControllers from "../controllers/userControllers.js";
import movieController from "../controllers/movieController.js";
const connectionString = `mongodb+srv://search_movie_bot:Jamshid2000@cluster0.frdhwcl.mongodb.net/`
const migrationDb =await mongoose.createConnection(connectionString,)

const UserModel = migrationDb.model('MovieSchema', new mongoose.Schema(
    {
        code: {
            type: String,
            required: true,
        },
        movies: {
            type: [Object],
            required: true,
        },
        active: {
            type: Boolean,
            default: true,
        }

    }, {
        timestamps: {
            createdAt: 'created_at', // Use `created_at` to store the created date
            updatedAt: 'updated_at' // and `updated_at` to store the last updated date
        }
    }
));

migrationDb.asPromise()
    .then(() => console.log('createConnection orqali ulanish o‘rnatildi'))
    .catch((err) => console.error('Ulanish xatosi:', err));


const migrationUser = async ()=>{
    try{
        let userList = await UserModel.find({active:true},{}, { enableUtf8Validation: false })
        for(let i=0; i<userList.length; i++){
           const movie = userList[i]
            let data = {
                fileId:movie.movies[0].url,
                caption:movie.movies[0].name,
                movieCode:movie.code,
                active:true,
            }
            console.log(data)

            const result = await movieController._create(data)
            console.log(result)
        }

    }catch (error){
        console.log(error)
    }
}

// migrationUser()