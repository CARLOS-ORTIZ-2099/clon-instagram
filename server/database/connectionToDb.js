import mongoose from "mongoose";

export async function connectionToDb() {
  try {
    await mongoose.connect(
      process.env.NODE_ENV === "production"
        ? process.env.URI_DB_PROD
        : process.env.URI_DB_DEV
    );
    console.log(`connected to db successfully`);
  } catch (err) {
    // console.log(`${err}`.red);
    throw new Error(`error unexpected to connected to DB ${err}`);
  }
}
