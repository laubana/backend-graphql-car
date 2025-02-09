import mongoose from "mongoose";

const ownerSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required."],
    },
    lastName: {
      type: String,
      required: [true, "Last name is required."],
    },
  },
  { timestamps: true }
);

export default mongoose.models["Owner"] || mongoose.model("Owner", ownerSchema);
