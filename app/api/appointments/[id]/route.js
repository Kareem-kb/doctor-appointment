import connectDB from "@/app/lib/connect";
import appointmentSc from "@/app/models/appointment/appointmentSchema";
import { NextResponse } from "next/server";

// Get a specific appointment by ID
export async function GET(request, { params }) {
  await connectDB();
  const { id } = params;

  try {
    const appointment = await appointmentSc.findById(id).populate('patient doctor hospital');
    if (!appointment) {
      return NextResponse.json({ error: 'Appointment not found' }, { status: 404 });
    }
    return NextResponse.json(appointment, { status: 200 });
  } catch (error) {
    console.error('Error fetching appointment:', error.message);
    return NextResponse.json({ error: 'Failed to fetch appointment' }, { status: 500 });
  }
}

// Update a specific appointment by ID
export async function PUT(request, { params }) {
  await connectDB();
  const { id } = params;
  const body = await request.json();

  try {
    const updatedAppointment = await appointmentSc.findByIdAndUpdate(id, body, { new: true }).populate('patient doctor hospital');
    if (!updatedAppointment) {
      return NextResponse.json({ error: 'Appointment not found' }, { status: 404 });
    }
    return NextResponse.json(updatedAppointment, { status: 200 });
  } catch (error) {
    console.error('Error updating appointment:', error.message);
    return NextResponse.json({ error: 'Failed to update appointment' }, { status: 500 });
  }
}

// Delete a specific appointment by ID
export async function DELETE(request, { params }) {
  await connectDB();
  const { id } = params;

  try {
    const deletedAppointment = await appointmentSc.findByIdAndDelete(id);
    if (!deletedAppointment) {
      return NextResponse.json({ error: 'Appointment not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Appointment deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting appointment:', error.message);
    return NextResponse.json({ error: 'Failed to delete appointment' }, { status: 500 });
  }
}
