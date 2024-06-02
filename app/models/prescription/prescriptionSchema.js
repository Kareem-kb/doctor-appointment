import mongoose from 'mongoose';
const { Schema } = mongoose;

const prescriptionSchema = new Schema({
  description: {
    type: String,
    required: true,
  },
  doctor: {
    type: Schema.Types.ObjectId,
    ref: 'Doctor',
    required: true,
  },
  doctorSpecialization: {
    type: String,
    required: true,
  },
  visitTime: {
    type: Date,
    required: true,
  },
  daysAgo: {
    type: Number,
    required: true,
  },
  medicines: [{
    type: String,
    required: true,
  }],
  patient: {
    type: Schema.Types.ObjectId,
    ref: 'Patient',
    required: true,
  },
}, { timestamps: true });

prescriptionSchema.index({ patient: 1, visitTime: -1 }); 

const Prescription = mongoose.models.Prescription || mongoose.model('Prescription', prescriptionSchema);

export default Prescription;
