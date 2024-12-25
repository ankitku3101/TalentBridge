import { hash } from 'bcryptjs';
import Student from '@/models/Student'; 
import Employer from '@/models/Employer';
import dbConnect from '@/lib/mongodb';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, password, role, company, position, hiringFor, contactNumber } = body;

    if (!name || !email || !password) {
      return NextResponse.json({ error: 'Name, email, and password are required' }, { status: 400 });
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
      const existingUser = await Student.findOne({ email });
      if (existingUser) {
        return NextResponse.json({ error: 'Email is already in use' }, { status: 400 });
      }

      const hashedPassword = await hash(password, 10);

      const newUser = await Student.create({
        name,
        email,
        password: hashedPassword,
        role: role || 'student',
      });

      return NextResponse.json({ message: 'User created successfully', user: newUser }, { status: 201 });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
