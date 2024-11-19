import { Schema, model } from "mongoose";
import { commentShema } from "./Comment.js";

const publicationSchema = new Schema({
  content: {
    type: String,
  },
  file: {
    type: Schema.Types.Mixed,
    required: [true, "el archivo es requerido"],
  },
  ownerPublication: { type: Schema.Types.ObjectId, ref: "User" },
  comments: [commentShema],
  likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
  cretedDate: { type: Date, default: Date.now },
});

export const Publication = model("Publication", publicationSchema);
