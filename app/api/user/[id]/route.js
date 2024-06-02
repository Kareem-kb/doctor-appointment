// app/api/user/[id]/route.js
import { NextResponse } from 'next/server';
import User from '@/app/models/user/userSc';
import Patient from '@/app/models/patient/patientSch';
import Doctor from '@/app/models/doctor/doctorSchema';
import Hospital from '@/app/models/hospital/hospitalSchema';
import connectDB from '@/app/lib/connect';

export async function GET(request, { params }) {
  await connectDB();

  const { id } = params;

  try {
    const user = await User.findById(id).lean();
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    let referenceData;
    if (user.role === 'Patient') {
      referenceData = await Patient.findById(user.referenceId).lean();
    } else if (user.role === 'Doctor') {
      referenceData = await Doctor.findById(user.referenceId).lean();
    } else if (user.role === 'Hospital') {
      referenceData = await Hospital.findById(user.referenceId).lean();
    }

    if (!referenceData) {
      return NextResponse.json({ message: 'Reference data not found' }, { status: 404 });
    }

    return NextResponse.json({ user, referenceData }, { status: 200 });
  } catch (error) {
    console.error('Error fetching user data:', error.message);
    return NextResponse.json(
      { message: 'Internal Server Error', error: error.message },
      { status: 500 }
    );
  }
}
