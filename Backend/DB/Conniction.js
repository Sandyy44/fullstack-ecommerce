import mongoose from "mongoose";

const connectDB = async () => {
  const DBURI = process.env.DBURI;
  try {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(DBURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("✅ MongoDB connected");
    }
  } catch (err) {
    console.error("DB connection error:", err.message);
  }
};

export default connectDB;
