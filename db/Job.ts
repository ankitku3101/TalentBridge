import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema(
  {
    title: { 
      type: String, 
      required: true 
    }, // Job title (e.g., "Software Engineer")
    description: { 
      type: String, 
      required: true 
    }, // Detailed job description
    company: { 
      type: String, 
      required: true 
    }, // Company offering the job
    location: { 
      type: String, 
      required: true 
    }, // Location of the job
    employmentType: { 
      type: String, 
      enum: ['Full-time', 'Part-time', 'Internship', 'Contract'], 
      required: true 
    }, // Employment type
    salaryRange: { 
      type: String 
    }, // Optional field to specify salary range (e.g., "₹5 LPA - ₹8 LPA")
    skillsRequired: [String], // List of required skills for the job
    postedBy: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Employer', 
      required: true 
    }, // Reference to the employer who posted the job
    applicants: [{ 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Student' 
    }], // Array of student IDs who applied for the job
  },
  { 
    timestamps: true // Automatically adds createdAt and updatedAt fields
  }
);

export default mongoose.models.Job || mongoose.model('Job', jobSchema);
