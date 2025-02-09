import mongoose from "mongoose";

const carSchema = new mongoose.Schema(
  {
    year: {
      type: String,
      required: [true, "Year is required."],
    },
    make: {
      type: String,
      required: [true, "Make is required."],
    },
    model: {
      type: String,
      required: [true, "Model is required."],
    },
    price: {
      type: String,
      required: [true, "Price is required."],
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Owner",
      required: [true, "Owner is required."],
    },
  },
  { timestamps: true }
);

export default mongoose.models["Car"] || mongoose.model("Car", carSchema);
