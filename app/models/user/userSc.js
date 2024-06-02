import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    role: {
      type: String,
      required: true,
      enum: ["Patient", "Doctor", "Hospital"],
    },
    referenceId: {
      type: Schema.Types.ObjectId,
      refPath: "role",
    },
  },
  { timestamps: true },
);

userSchema.index({ email: 1 });

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
