import { Schema, model } from "mongoose";

const followerSchema = new Schema({
  followedUser: { type: Schema.Types.ObjectId, ref: "User" }, // usuario al que sigo
  followerUser: { type: Schema.Types.ObjectId, ref: "User" }, // usuario que sigue a otro usuario
});

export const Follower = model("Follower", followerSchema);
