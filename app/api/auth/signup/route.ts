import { hash } from 'bcryptjs';
import Student from '@/models/Student';
import Employer from '@/models/Employer';
import dbConnect from '@/lib/mongodb';
import { NextRequest, NextResponse } from 'next/server';
import Skills from '@/models/Skills';
import mongoose from 'mongoose';
import University from '@/models/University';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      name,
      age,
      email,
      password,
      rollNumber,
      college,
      degree,
      graduationYear,
      skills,
      phone,
      role,
      company,
      position,
      hiringFor,
      contactNumber,
      yoe
    } = body;

    if (!name || !email || !password || !phone) {
      return NextResponse.json({ error: 'Name, email, password, and phone are required' }, { status: 400 });
    }

    const normalizedRole = role?.toLowerCase();
    await dbConnect();

    if (normalizedRole === 'employer') {
      if (!company) {
        return NextResponse.json({ error: 'Company is required for employer signup' }, { status: 400 });
      }

      const existingEmployer = await Employer.findOne({ email });
      if (existingEmployer) {
        return NextResponse.json({ error: 'Email is already in use' }, { status: 400 });
      }

      const hashedPassword = await hash(password, 10);

      const newEmployer = await Employer.create({
        name,
        email,
        password: hashedPassword,
        company,
        position,
        hiringFor,
        contactNumber,
        role: 'employer',
      });

      return NextResponse.json({ message: 'Employer created successfully', user: newEmployer }, { status: 201 });
    } else if (normalizedRole === 'student') {
      if (!rollNumber || !degree || !graduationYear || !age) {
        return NextResponse.json({
          error: 'Roll number, degree, graduation year, and age are required for student signup',
        }, { status: 400 });
      }

      const existingStudent = await Student.findOne({ email });
      if (existingStudent) {
        return NextResponse.json({ error: 'Email is already in use' }, { status: 400 });
      }

      const hashedPassword = await hash(password, 10);

      //Skill Setting
      const SkillIds:mongoose.Types.ObjectId[] = [];

      for(const name of skills){
        let foundskill = await Skills.findOne({skillname:name.toUpperCase()});

        if(!foundskill){
          foundskill = await Skills.create({skillname:name});
        }

        SkillIds.push(foundskill._id);
      }

      //College Id setting:
      const collegeObjectId = await University.findOne({name:college},{_id:1});
      const newStudent = await Student.create({
        name,
        age,
        email,
        password: hashedPassword,
        rollNumber,
        degree,
        college:collegeObjectId._id,
        graduationYear,
        skills: SkillIds || [],
        phone,
        role: 'student',
        yoe
      });

      return NextResponse.json({ message: 'Student created successfully', user: newStudent }, { status: 201 });
    } else {
      return NextResponse.json({ error: 'Invalid role' }, { status: 400 });
    }
  } catch (error) {
    // console.error(error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
