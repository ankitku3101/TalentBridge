import mongoose from "mongoose";
import bcrypt from 'bcryptjs';

const universitySchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required:true,
            trim:true,
            unique:true
        },
        adminname:{
            type:String,
            required:true,
            trim:true,
            lowercase:true,
        },
        adminpassword:{
            type:String,
            required:true,
            trim:true,
        },
        employerreach:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:'Emplopyer'
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
    if(!this.isModified("adminpassword")){next()}

    this.adminpassword = await bcrypt.hash(this.adminpassword,15);
    next()
})

universitySchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(this.adminpassword,password);
}

export default mongoose.models.University || mongoose.model('University', universitySchema);