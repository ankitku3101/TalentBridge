import { NextRequest, NextResponse } from "next/server";
import connectMongo from "@/lib/mongodb";
import Job from "@/models/Job";
import Employer from "@/models/Employer";
import mongoose from "mongoose";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";

export async function GET(request: NextRequest) {
  try {
    await connectMongo();

    const session = await getServerSession(authOptions);
    const userId = session?.user.id;
            
    const employerPresence = await Employer.findById(userId);
    if(!employerPresence){
      return NextResponse.json({error:"Unauthorized request"},{status:403});
    }

    if (!mongoose.models.Job) {
      mongoose.model('Job', Job.schema);
    }
    if (!mongoose.models.Employer) {
      mongoose.model('Employer', Employer.schema);
    }

    const { searchParams } = new URL(request.url);
    
    const title = searchParams.get('title') || '';
    const company = searchParams.get('company') || '';
    const location = searchParams.get('location') || '';
    const employmentType = searchParams.get('employmentType') || '';
    const minSalary = searchParams.get('minSalary') || 0;
    const maxSalary = searchParams.get('maxSalary') || 1000000;
    const skills = searchParams.get('skills')?.split(',') || [];

    // Pagination parameters
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');

    // Construct the filter object
    const filter: any = {
      postedBy:userId,
      title: { $regex: title, $options: 'i' },
      company: { $regex: company, $options: 'i' },
      location: { $regex: location, $options: 'i' },
      minSalary:{ $lte:maxSalary},
      maxSalary:{ $gte:minSalary}
    };

    if (employmentType) {
      filter.employmentType = employmentType;
    }

    if (skills.length > 0) {
      filter.skillsRequired = { $all: skills };
    }

    const totalJobsMatched = await Job.countDocuments(filter);

    const Jobs = await Job.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .populate('postedBy', 'name email company')
      .exec();

    return NextResponse.json({
      success: true,
      data: {
        jobs: Jobs,
        currentPage: page,
        totalPages: Math.ceil(totalJobsMatched / limit),
        totalJobs: totalJobsMatched,
      },
    });
  } catch (error) {
    console.error('Error fetching jobs:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch jobs',
    }, { status: 500 });
  }
}