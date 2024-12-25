import mongoose from 'mongoose';

const jobApplicationSchema = new mongoose.Schema(
  {
    student: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Student', 
      required: true 
    }, 
    job: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Job', 
      required: true 
    }, 
    coverLetter: { 
      type: String 
    }, 
    status: { 
      type: String, 
      enum: ['Applied', 'Shortlisted', 'Interviewing', 'Offered', 'Rejected'], 
      default: 'Applied' 
    }, 
    applicationDate: { 
      type: Date, 
      default: Date.now 
    }, 
  },
  { 
    timestamps: true 
  }
);

export default mongoose.models.JobApplication || mongoose.model('JobApplication', jobApplicationSchema);
