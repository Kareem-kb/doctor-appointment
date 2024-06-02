import connectDB from "@/app/lib/connect";
import Doctor from "@/app/models/doctor/doctorSchema";
import User from "@/app/models/user/userSc";
import { NextResponse } from "next/server";

export async function DELETE(request, { params }) {
    await connectDB();
    
    const { id } = params; // Extract the id from params
    
    console.log(id, "id is deleting");
    
    try {
      // Find the doctor by ID to get the referenceId
      const doctor = await Doctor.findById(id);
      if (!doctor) {
        return NextResponse.json({ error: 'Doctor not found' }, { status: 404 });
      }
      
      // Get the referenceId (user ID)
      const referenceId = doctor.user;
  
      // Delete the doctor
      const deletedDoctor = await Doctor.findByIdAndDelete(id);
      if (!deletedDoctor) {
        return NextResponse.json({ error: 'Doctor not found' }, { status: 404 });
      }
      
      // Delete the associated user
      const deletedUser = await User.findByIdAndDelete(referenceId);
      if (!deletedUser) {
        return NextResponse.json({ error: 'Associated user not found' }, { status: 404 });
      }
  
      return NextResponse.json({ message: 'Doctor and associated user deleted successfully' }, { status: 200 });
    } catch (error) {
      console.error('Error deleting doctor and user:', error.message);
      return NextResponse.json({ error: 'Failed to delete doctor and user' }, { status: 500 });
    }
  }