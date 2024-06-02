// app/api/register/route.js
import { NextResponse } from "next/server";
import User from "@/app/models/user/userSc";
import Patient from "@/app/models/patient/patientSch";

import Doctor from "@/app/models/doctor/doctorSchema";
import Hospital from "@/app/models/hospital/hospitalSchema";
import bcrypt from "bcrypt";
import connectDB from "@/app/lib/connect";

export async function POST(request) {
  await connectDB();

  const {
    role,
    email,
    password,
    firstName,
    lastName,
    gender,
    birthDay,
    height,
    weight,
    preCondition,
    medication,
    blood,
    allergies,
    Emergency,
    theAbout,
    hospital,
    specialties,
    languages,
    education,
    name,
    address,
    doctors,
  } = await request.json();

  if (!email || !password || !role) {
    return NextResponse.json(
      { message: "Email, password, and role are required" },
      { status: 400 },
    );
  }

  try {
    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "Email already exists" },
        { status: 409 },
      ); // Conflict
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    let referenceId;
    // Create User document first
    const user = new User({
      email,
      password: hashedPassword,
      role,
    });
    // await user.save();

    if (role === "Patient") {
     
      if (!firstName || !lastName || !gender || !birthDay || !blood) {
        return NextResponse.json(
          { message: "Missing required patient fields" },
          { status: 400 },
        );
      }
      const patient = new Patient({
        role,
        firstName,
        lastName,
        gender,
        birthDay,
        height,
        weight,
        preCondition,
        medication,
        blood,
        allergies,
        Emergency,
        user: user._id,
      });
      await patient.save();
      user.referenceId = patient._id; // Set referenceId with the new patient's ID
    } else if (role === "Doctor") {
      if (
        !firstName ||
        !lastName ||
        !theAbout ||
        !hospital ||
        !specialties ||
        !languages ||
        !gender ||
        !education
      ) {
        return NextResponse.json(
          { message: "Missing required doctor fields" },
          { status: 400 },
        );
      }
      const doctor = new Doctor({
        firstName,
        lastName,
        theAbout,
        hospital,
        specialties,
        languages,
        gender,
        education,
        user: user._id,
      });
      await doctor.save();
      user.referenceId = doctor._id; // Set referenceId with the new doctor's ID
    } else if (role === "Hospital") {
      if (!name || !about || !address) {
        return NextResponse.json(
          { message: "Missing required hospital fields" },
          { status: 400 },
        );
      }
      const hospitalEntity = new Hospital({
        name,
        about,
        address,
        doctors,
        user: user._id,
      });
      await hospitalEntity.save();
      user.referenceId = hospitalEntity._id; // Set referenceId with the new hospital's ID
    } else {
      return NextResponse.json({ message: "Invalid role" }, { status: 400 });
    }

    // Save the User document with the referenceId
    await user.save();

    return NextResponse.json(
      { message: "User registered successfully" },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error creating user:", error.message);
    return NextResponse.json(
      { message: "Internal Server Error", error: error.message },
      { status: 500 },
    );
  }
}
