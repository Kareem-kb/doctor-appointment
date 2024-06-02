import mongoose from 'mongoose';
const { Schema } = mongoose;

const patSchema = new Schema({
  role: {
    type: String,
    required: true,
    default: "Patient",
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
    enum: ["Male", "Female"],
  },
  birthDay: {
    type: Date,
    required: true,
  },
  height: {
    type: Number,
    required: false,
  },
  weight: {
    type: Number,
    required: false,
  },
  preCondition: {
    type: String,
    required: false,
  },
  medication: [{ type: String, required: false }],
  blood: {
    type: String,
    required: true,
    enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
  },
  allergies: [{ type: String, required: false }],
  Emergency: {
    Name: {
      type: String,
      required: false,
    },
    Phone: {
      type: Number,
      required: false,
    },
    Relation: {
      type: String,
      required: false,
    },
  },
  prescriptions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Prescription" }],
  appointments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Appointment" }],
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, { timestamps: true });

const PatientSc = mongoose.models.PatientSc || mongoose.model("PatientSc", patSchema);

export default PatientSc;
