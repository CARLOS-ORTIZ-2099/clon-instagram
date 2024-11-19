import { Schema, model } from "mongoose";

export const commentShema = new Schema({
  content: {
    type: String,
  },
  ownerComment: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  cretedDate: {
    type: Date,
    default: Date.now,
  },
});
