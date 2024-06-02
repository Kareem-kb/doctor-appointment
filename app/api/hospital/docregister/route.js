import { NextResponse } from "next/server";
import User from "@/app/models/user/userSc";

import Doctor from "@/app/models/doctor/doctorSchema";
import bcrypt from "bcrypt";
import connectDB from "@/app/lib/connect";
import { getSession, useSession } from "next-auth/react";
import Hospital from "@/app/models/hospital/hospitalSchema";
import { authOptions } from "@/app/lib/auth";
import { getServerSession } from "next-auth";

export async function POST(request) {
  await connectDB();

  const session = await getServerSession(authOptions);

  const {
    role,
    email,
    password,
    firstName,
    lastName,
    gender,
    theAbout,
    languages,
    specialties,
    education,
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

    // Create User document first
    const user = new User({
      email,
      password: hashedPassword,
      role,
    });
    // await user.save();

    // if (
    //   !firstName ||
    //   !lastName ||
    //   !theAbout ||
    //   !specialties ||
    //   !languages ||
    //   !gender ||
    //   !education
    // ) {
    //   return NextResponse.json(
    //     { message: "Missing required doctor fields" },
    //     { status: 400 },
    //   );
    // }

    const doctor = new Doctor({
      firstName,
      lastName,
      theAbout,
      specialties: specialties,
      education: education.join(", "),
      languages: languages.join(", "),
      gender,
      hospital: session.user.referenceId,
      user: user._id,
    });

    await doctor.save();
    user.referenceId = doctor._id; // Set referenceId with the new doctor's ID

    // Save the User document with the referenceId
    await user.save();

    return NextResponse.json(
      { message: "Doctor registered successfully" },
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
