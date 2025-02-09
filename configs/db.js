import mongoose from "mongoose";

export const connect = async () => {
  try {
    await mongoose.connect(process.env.DB_URI);
  } catch (error) {
    console.error(error);

    console.error("Failed to connect to DB 🚨");
  }
};
