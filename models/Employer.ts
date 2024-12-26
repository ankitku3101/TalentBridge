import mongoose from 'mongoose';

const employerSchema = new mongoose.Schema(
  {
    name: { 
      type: String, 
      required: true 
    },
    company: { 
      type: String, 
      required: true 
    },
    email: { 
      type: String, 
      required: true, 
      unique: true 
    },
    password: { 
      type: String, 
      required: true 
    },
    position: { 
      type: String 
    }, 
    hiringFor: [String], 
    contactNumber: { 
      type: String 
    },
    role: { 
      type: String,
      required: true,
      default: "student" 
    }, 
  },
  { 
    timestamps: true 
  }
);

export default mongoose.models.Employer || mongoose.model('Employer', employerSchema);
