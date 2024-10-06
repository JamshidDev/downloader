
import mongoose from "mongoose"

const movieSchema = mongoose.Schema({
    fileId:{
        type:String,
        default:null,
    },
    caption:{
        type:String,
        default:null,
    },
    movieCode:{
        type:String,
        required:true,
    },
    movies:{
        type:[{
            fileId:String,
            caption:String,
        }],
        default: []
    },
    active: {
        type: Boolean,
        default: true,
    }
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at' ,
    }
})

const MovieModel = mongoose.model("MovieModel",movieSchema);

export default  MovieModel;