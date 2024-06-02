import connectDB from "@/app/lib/connect";
import appointmentSc from "@/app/models/appointment/appointmentSchema";
import { NextResponse } from "next/server";

// Create a new appointment
export async function POST(request) {
  await connectDB();
  const body = await request.json();

  const { time, date, doctor } = body;
   // Check if there is already an appointment at the same time for the same doctor
  const overlappingAppointment = await appointmentSc.findOne({
    doctor,
    time,
    date,
  });

  if (overlappingAppointment) {
    return NextResponse.json(
      { error: 'This time slot is already booked for the selected doctor' },
      { status: 400 }
    );
  }

  try {
    const newAppointment = new appointmentSc(body);
    const savedAppointment = await newAppointment.save();
    return NextResponse.json(savedAppointment, { status: 201 });
  } catch (error) {
    console.error('Error creating appointment:', error.message);
    return NextResponse.json({ error: 'Failed to create appointment' }, { status: 500 });
  }
}

// Get all appointments
export async function GET(request) {
  await connectDB();
  const { searchParams } = new URL(request.url);
  const doctorId = searchParams.get('doctorId');

  console.log('doctorId:', doctorId); // Debugging log

  try {
    const query = doctorId ? { doctor: doctorId } : {};
    console.log('query:', query); // Debugging log

    const appointments = await appointmentSc.find(query).populate('patient doctor hospital');
    console.log('appointments:', appointments); // Debugging log

    return NextResponse.json(appointments, { status: 200 });
  } catch (error) {
    console.error('Error fetching appointments:', error.message);
    return NextResponse.json({ error: 'Failed to fetch appointments' }, { status: 500 });
  }
}