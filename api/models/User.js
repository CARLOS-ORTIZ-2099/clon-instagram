import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";

const userShema = new Schema({
  fullname: {
    type: String,
    required: [true, "fullname es requerido"],
    minlength: [1, "son necesarios 1 caracteres"],
  },
  username: {
    type: String,
    required: [true, "username es requerido"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "email es requerido"],
    unique: true,
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "inserta un email valido",
    ],
  },
  password: {
    type: String,
    required: [true, "password es requerido"],
    minlength: [6, "el password deberia tener minimo 6 caracteres"],
  },
  avatar: Schema.Types.Mixed,
  bio: {
    type: String,
    default: "",
  },
});

userShema.methods.validateEmail = function (email) {
  const regex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (!regex.test(email)) {
    return true;
  }
};

userShema.methods.validatePassword = function (password) {
  if (!password || password.trim().length < 6) {
    return true;
  }
};

userShema.methods.userExists = async function (email) {
  const result = await User.findOne({ email });
  if (!result) return false;
  return result;
};

userShema.pre("save", async function (next) {
  try {
    if (this.isModified("password")) {
      console.log("modificando password");
      this.password = await bcrypt.hash(this.password, 10);
      next();
    }
  } catch (error) {
    next(error);
  }
});

export const User = model("User", userShema);
