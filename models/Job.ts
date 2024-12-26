import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema(
  {
    title: { 
      type: String, 
      required: true 
    }, 
    description: { 
      type: String, 
      required: true 
    }, 
    company: { 
      type: String, 
      required: true 
    }, 
    location: { 
      type: String, 
      required: true 
    }, 
    employmentType: { 
      type: String, 
      enum: ['Full-time', 'Part-time', 'Internship', 'Contract'], 
      required: true 
    },
    minSalary:{
      type:Number,
      default:[0,"Can't be In negative"]
    },
    maxSalary:{
      type:Number,
      default:[0,"Can't be In negative"]
    },
    skillsRequired: [String], 
    postedBy: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Employer', 
      required: true 
    }, 
    applicants: [{ 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Student' 
    }], 
  },
  { 
    timestamps: true 
  }
);

export default mongoose.models.Job || mongoose.model('Job', jobSchema);
