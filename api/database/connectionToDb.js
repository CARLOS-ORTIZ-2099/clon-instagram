import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
/* console.log(process.env.NODE_ENV);
console.log(process.env.MONGO_URI);
console.log(process.env.URI_DEV); */

export async function connectionToDb() {
  try {
    await mongoose.connect(
      process.env.NODE_ENV === "production"
        ? process.env.MONGO_URI
        : process.env.URI_DEV
    );
    console.log(`connected to db successfully`);
  } catch (err) {
    console.log(`error unexpected to connected to DB ${err}`);
    process.exit(1);
  }
}
