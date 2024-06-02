import mongoose from "mongoose";
const { Schema } = mongoose;

const appointmentSchema = new Schema(
  {
    time: {
      type: Date,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    // Reference patient using an ObjectId
    patient: {
      type: Schema.Types.ObjectId,
      ref: "PatientSc", // Reference the Patient model name
      required: true,
    },
    // Reference doctor using an ObjectId
    doctor: {
      type: Schema.Types.ObjectId,
      ref: "Doctor", // Reference the Doctor model name
      required: true,
    },
    // Reference hospital using an ObjectId
    hospital: {
      type: Schema.Types.ObjectId,
      ref: "Hospital", // Reference the Hospital model name
      required: true,
    },
    reasonToVisit: {
      type: String,
      required: false,
    },
  },
  { timestamps: true },
);

const appointmentSc =
  mongoose.models.Appointment ||
  mongoose.model("Appointment", appointmentSchema);

export default appointmentSc;
