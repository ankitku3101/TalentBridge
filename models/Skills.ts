import mongoose from "mongoose";

const skillSchema = new mongoose.Schema(
    {
        skillname:{
            type:String,
            unique:true,
            uppercase:true,
            trim:true
        }
    },
    {
        timestamps:true
    }
)

export default mongoose.models.Skills || mongoose.model('Skills', skillSchema);