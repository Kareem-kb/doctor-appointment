import connectDB from "@/app/lib/connect";
import Prescription from "@/app/models/prescription/prescriptionSchema";
import { NextResponse } from "next/server";

// Get a specific prescription by ID
export async function GET(request, { params }) {
  await connectDB();
  const { id } = params;

  try {
    const prescription = await Prescription.findById(id).populate('patient doctor');

    if (!prescription) {
      return NextResponse.json({ error: 'Prescription not found' }, { status: 404 });
    }
    return NextResponse.json(prescription, { status: 200 });
  } catch (error) {
    console.error('Error fetching prescription:', error.message);
    return NextResponse.json({ error: 'Failed to fetch prescription' }, { status: 500 });
  }
}

// Update a specific prescription by ID
export async function PUT(request, { params }) {
  await connectDB();
  const { id } = params;
  const body = await request.json();

  try {
    const updatedPrescription = await Prescription.findByIdAndUpdate(id, body, { new: true }).populate('doctor', 'name specialization').populate('patient', 'name');
    if (!updatedPrescription) {
      return NextResponse.json({ error: 'Prescription not found' }, { status: 404 });
    }
    return NextResponse.json(updatedPrescription, { status: 200 });
  } catch (error) {
    console.error('Error updating prescription:', error.message);
    return NextResponse.json({ error: 'Failed to update prescription' }, { status: 500 });
  }
}

// Delete a specific prescription by ID
export async function DELETE(request, { params }) {
  await connectDB();
  const { id } = params;

  try {
    const deletedPrescription = await Prescription.findByIdAndDelete(id);
    if (!deletedPrescription) {
      return NextResponse.json({ error: 'Prescription not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Prescription deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting prescription:', error.message);
    return NextResponse.json({ error: 'Failed to delete prescription' }, { status: 500 });
  }
}