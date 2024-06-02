import mongoose from "mongoose";
const { Schema } = mongoose;

const doctorSchema = new Schema(
  {
    role: {
      type: String,
      default: "Doctor",
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    theAbout: {
      type: String,
      required: true,
    },
    hospital: {
      type: Schema.Types.ObjectId,
      ref: "Hospital",
    },
    specialties: {
      type: [String],
      required: true,
    },
    languages: {
      type: [String],
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    education: {
      type: String,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Doctor = mongoose.models.Doctor || mongoose.model("Doctor", doctorSchema);

export default Doctor;
