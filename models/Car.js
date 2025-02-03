import { model, models, Schema, Types } from "mongoose";

const carSchema = new Schema(
  {
    year: {
      required: [true, "Year is required."],
      type: String,
    },
    make: {
      required: [true, "Make is required."],
      type: String,
    },
    model: {
      required: [true, "Model is required."],
      type: String,
    },
    price: {
      required: [true, "Price is required."],
      type: String,
    },
    owner: {
      ref: "Owner",
      required: [true, "Owner is required."],
      type: Types.ObjectId,
    },
  },
  { timestamps: true }
);

export default models["Car"] || model("Car", carSchema);
