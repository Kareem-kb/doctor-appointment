import { NextResponse } from 'next/server';
import Doctor from '@/app/models/doctor/doctorSchema';
import connectDB from '@/app/lib/connect';

export async function GET() {
  await connectDB();

  try {
    const doctors = await Doctor.find({}).populate('hospital user').lean();
    return NextResponse.json(doctors, { status: 200 });
  } catch (error) {
    console.error('Error fetching doctors:', error.message);
    return NextResponse.json({ error: 'Failed to fetch doctors' }, { status: 500 });
  }
}


export async function DELETE(request) {
  await connectDB();

  const url = new URL(request.url);
  const id = url.pathname.split('/').pop(); // Extract the id from the URL

  console.log(id, "id is deleting");

  try {
    const deletedDoctor = await Doctor.findByIdAndDelete(id);
    if (!deletedDoctor) {
      return NextResponse.json({ error: 'Doctor not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Doctor deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting doctor:', error.message);
    return NextResponse.json({ error: 'Failed to delete doctor' }, { status: 500 });
  }
}