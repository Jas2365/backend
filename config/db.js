import mongoose from "mongoose";

export const ConnectDB = async () => {
  try {
    const conn = await mongoose
      .connect(process.env.MONGO_URI)
      .catch((err) => console.error(err));
    console.log(`MongoDB Connected host: ${conn.connection.host}`);
    console.log(`MongoDB Connected post: ${conn.connection.port}`);
    console.log(`MongoDB Connected DB: ${conn.connection.name}`);
  } catch (error) {
    console.error(`Error ${error.message}`);
    process.exit(1);
  }
};
