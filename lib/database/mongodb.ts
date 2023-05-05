import mongoose from "mongoose";

const connection = {
  isConnected: false
};

const dbConnect = async () => {
  if (connection.isConnected) return;

  const db = await mongoose.connect(process.env.DATABASE_URL!);

  connection.isConnected = Boolean(db.connections[0].readyState);
};

export default dbConnect;
