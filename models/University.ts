import mongoose from "mongoose";
import bcrypt from 'bcryptjs';
import { unique } from "next/dist/build/utils";

const universitySchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required:true,
            trim:true,
            unique:true
        },
        email:{
            type:String,
            unique:true,
            lowecase:true,
            trim:true
        },
        password:{
            type:String,
            required:true,
            trim:true,
        },
        employerreach:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:'Employer'
            }
        ],
        role:{
            type:String,
            default:"college"
        }
    },
    {
        timestamps:true
    }
)

universitySchema.pre('save',async function(next){
    if(!this.isModified("password")){next()}

    this.password = await bcrypt.hash(this.password,15);
    next()
})

universitySchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(this.password,password);
}

export default mongoose.models.University || mongoose.model('University', universitySchema);