import connectDB from "@/app/lib/connect";
import Prescription from "@/app/models/prescription/prescriptionSchema";
import { NextResponse } from "next/server";

export async function GET(request) {
  await connectDB();
  const { searchParams } = new URL(request.url);
  const doctorId = searchParams.get("doctorId");

  try {
    const query = doctorId ? { doctor: doctorId } : {};

    const prescriptions = await Prescription.find(query).populate(
      "doctor",
      "firstName lastName specialization"
    ).populate(
      "patient",
      "firstName lastName"
    ).lean();

    // Modify the result to include the patient's full name
    const modifiedPrescriptions = prescriptions.map(prescription => ({
      ...prescription,
      patientName: `${prescription.patient.firstName} ${prescription.patient.lastName}`,
    }));

    return NextResponse.json(modifiedPrescriptions, { status: 200 });
  } catch (error) {
    console.error("Error fetching prescriptions:", error.message);
    return NextResponse.json(
      { error: "Failed to fetch prescriptions" },
      { status: 500 }
    );
  }
}
