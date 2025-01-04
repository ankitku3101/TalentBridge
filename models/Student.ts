import mongoose from 'mongoose';
import { validators } from 'tailwind-merge';

const studentSchema = new mongoose.Schema(
  {
    name: { 
      type: String, 
      required: true 
    },
    age: { 
      type: Number, 
      required: true 
    },
    password: { 
      type: String, 
      required: true 
    },
    rollNumber: { 
      type: String, 
      required: true, 
      unique: true 
    },
    degree: { 
      type: String, 
      required: true 
    },
    graduationYear: { 
      type: Number, 
      required: true 
    },
    email: { 
      type: String, 
      required: true, 
      unique: true 
    },
    skills: [String], 
    phone: { 
      type: String, 
      required: true, 
      unique: true 
    },
    role: { 
      type: String,
      required: true,
      default: "student" 
    },
    YOE:{
      type:Number,
      default:0,
      validate:{
        validator:(value:number)=> value>=0,
        message:"Year of experience can't be in negative."
      }
    }
  },
  { 
    timestamps: true 
  }
);

export default mongoose.models.Student || mongoose.model('Student', studentSchema);
