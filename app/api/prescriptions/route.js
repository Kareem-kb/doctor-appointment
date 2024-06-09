import connectDB from "@/app/lib/connect";
import Prescription from "@/app/models/prescription/prescriptionSchema";
import { NextResponse } from "next/server";

// Create a new prescription
export async function POST(request) {
  await connectDB();
  const body = await request.json();

  try {
    const newPrescription = new Prescription(body);
    const savedPrescription = await newPrescription.save();
    return NextResponse.json(savedPrescription, { status: 201 });
  } catch (error) {
    console.error("Error creating prescription:", error.message);
    return NextResponse.json(
      { error: "Failed to create prescription" },
      { status: 500 },
    );
  }
}

// Get all prescriptions or prescriptions by patient ID
export async function GET(request) {
  await connectDB();
  const { searchParams } = new URL(request.url);
  const patientId = searchParams.get("patientId");

  try {
    const query = patientId ? { patient: patientId } : {};

    const prescriptions = await Prescription.find(query).populate(
      "doctor",
      "firstName lastName specialization",
    );
    return NextResponse.json(prescriptions, { status: 200 });
  } catch (error) {
    console.error("Error fetching prescriptions:", error.message);
    return NextResponse.json(
      { error: "Failed to fetch prescriptions" },
      { status: 500 },
    );
  }
}
