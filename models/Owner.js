import { model, models, Schema } from "mongoose";

const ownerSchema = new Schema(
  {
    firstName: {
      required: [true, "First name is required."],
      type: String,
    },
    lastName: {
      required: [true, "Last name is required."],
      type: String,
    },
  },
  { timestamps: true }
);

export default models["Owner"] || model("Owner", ownerSchema);
