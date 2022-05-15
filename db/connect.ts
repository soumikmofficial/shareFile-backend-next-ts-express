import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
  } catch (error: any) {
    console.log("connection error", error.message);
  }

  const connection = mongoose.connection;
  if (connection.readyState >= 1) {
    console.log("connected to database");
    return;
  }
  connection.on("error", () => {
    console.log("connection failed");
  });
};
4;

export default connectDB;
