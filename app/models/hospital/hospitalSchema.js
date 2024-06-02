import mongoose from "mongoose";
const { Schema } = mongoose;

const hospitalSchema = new Schema(
  {
    role: {
      type: String,
      default: "Hospital",
    },
    name: {
      type: String,
      required: true,
      unique: true,
    },
    about: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    doctors: [
      {
        type: Schema.Types.ObjectId,
        ref: "Doctor",
      },
    ],
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true },
);

const Hospital =
  mongoose.models.Hospital || mongoose.model("Hospital", hospitalSchema);

export default Hospital;
