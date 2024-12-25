import mongoose from 'mongoose';

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
  },
  { 
    timestamps: true 
  }
);

export default mongoose.models.Student || mongoose.model('Student', studentSchema);
