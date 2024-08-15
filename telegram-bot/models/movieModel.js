
import mongoose from "mongoose"

const movieSchema = mongoose.Schema({
    fileId:{
        type:String,
        required:true,
    },
    caption:{
        type:String,
    },
    movieCode:{
        type:String,
        required:true,
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