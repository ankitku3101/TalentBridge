import { hash } from 'bcryptjs';
import Student from '@/models/Student';
import Employer from '@/models/Employer';
import dbConnect from '@/lib/mongodb';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      name,
      age,
      email,
      password,
      rollNumber,
      degree,
      graduationYear,
      skills,
      phone,
      role,
      company,
      position,
      hiringFor,
      contactNumber,
    } = body;

    if (!name || !email || !password || !rollNumber || !degree || !graduationYear || !age || !phone) {
      return NextResponse.json({ error: 'Missing required fields for student signup' }, { status: 400 });
    }

    await dbConnect();

    if (role === 'employer') {
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
      });

      return NextResponse.json({ message: 'Employer created successfully', user: newEmployer }, { status: 201 });
    } else {
      const existingStudent = await Student.findOne({ email });
      if (existingStudent) {
        return NextResponse.json({ error: 'Email is already in use' }, { status: 400 });
      }

      const hashedPassword = await hash(password, 10);

      const newStudent = await Student.create({
        name,
        age,
        email,
        password: hashedPassword,
        rollNumber,
        degree,
        graduationYear,
        skills: skills || [], 
        phone,
      });

      return NextResponse.json({ message: 'Student created successfully', user: newStudent }, { status: 201 });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
