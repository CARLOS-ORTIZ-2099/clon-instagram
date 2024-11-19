import { User } from "../models/User.js";
import bcrypt from "bcryptjs";
import { MyError } from "../error/MyError.js";
import { createToken } from "../libs/createToken.js";
import jwt from "jsonwebtoken";
import { Publication } from "../models/Publication.js";
import { Follower } from "../models/Follower.js";
import { processImageAvatar } from "../libs/processImage.js";
import { deleteOneImageCloud, uploadStream } from "../libs/cloudinary.js";

export const register = async (req, res, next) => {
  try {
    const { body } = req;
    const user = new User(body);
    await user.save();
    res.send({ message: "register successfully " });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    let user = new User();

    if (user.validateEmail(email)) {
      return next(
        new MyError("inserta un email valido", "insert one email valid", 400)
      );
    }
    if (user.validatePassword(password)) {
      return next(
        new MyError("inserta un password valido", "password is required", 400)
      );
    }
    const userexist = await user.userExists(email);
    if (!userexist) {
      return next(
        new MyError(
          "no se encontro al usuario",
          "not there is one account register with this email",
          404
        )
      );
    }

    // validar el password que me manda el usuario con el password hasheado dela DB
    const isvalidPassword = await bcrypt.compare(password, userexist.password);

    if (!isvalidPassword) {
      return next(
        new MyError(
          "error al validar cuenta",
          "password not matches with email",
          404
        )
      );
    }
    // este token que creemos servira para la autenticacion
    const token = createToken(userexist._id);

    // guardamos el token en las cookies, para su posterior acceso como autenticacion
    const userToSend = { ...userexist._doc };
    delete userToSend.password;
    res
      .cookie("_token", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 dias
        httpOnly: false, // con esto si es true nadie puede acceder a la cookie con js
        sameSite: "strict", // previene ataques CSRF (falsificacion de solicitudes en sitios cruzados)
        secure: process.env.NODE_ENV === "production",
      })
      .send(userToSend);
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res, next) => {
  res.clearCookie("_token").send({ message: "close session" });
};

export const verifyToken = async (req, res, next) => {
  console.log("entro a verificar");
  try {
    const { _token } = req.cookies;
    if (!_token) {
      return next(new MyError("no hay token", "not have you token", 401));
    }

    const decoded = jwt.verify(_token, process.env.SECRETWORD);
    const user = await User.findById({ _id: decoded.id }).select("-password");
    if (!user) {
      return next(new MyError("no autorizado", "not have you authorize", 401));
    }
    res.send(user);
  } catch (error) {
    res.clearCookie("_token");
    next(error);
    /* res.status(404).send({ msg: error.message }); */
  }
};

export const editProfile = async (req, res, next) => {
  try {
    // recibo los parametros del body
    const { file } = req;
    const { body } = req;
    const { id } = req.params;
    console.log(file);
    const userFound = await User.findById({ _id: id });
    if (!userFound) {
      return next(new MyError("usuario no existe"));
    }

    userFound.fullname = body?.fullname?.trim() || userFound.fullname;
    userFound.username = body?.username?.trim() || userFound.username;
    userFound.email = body?.email?.trim() || userFound.email;
    userFound.password = body?.password?.trim() || userFound.password;
    userFound.bio = body?.bio?.trim() || "";

    await userFound.save();

    if (file) {
      // si existe la imagen debemos procesarla en cloudinary
      console.log("cliente envia imagen");
      const processedImage = await processImageAvatar(file.buffer);
      const { public_id, secure_url } = await uploadStream(processedImage);
      userFound.avatar &&
        (await deleteOneImageCloud(userFound.avatar.public_id));
      userFound.avatar = { public_id, secure_url };
      await userFound.save();
    }

    const user = { ...userFound._doc };
    delete user.password;
    res.send(user);
    //res.send("bien");
  } catch (error) {
    next(error);
  }
};

export const getProfile = async (req, res, next) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username: username }).select("-password");

    if (!user) {
      return next(new MyError("usuario no encontrado"));
    }

    // con el usuario obtenido puedo buscar las publicaciones y los seguidos y seguidores del usuario

    let getPublications = Publication.find({
      ownerPublication: user._id,
    }).select("file comments likes");

    let getFolloweds = Follower.find({ followerUser: user._id });
    let getFollowers = Follower.find({ followedUser: user._id });

    const [publications, followeds, followers] = await Promise.all([
      getPublications,
      getFolloweds,
      getFollowers,
    ]);

    res.send({ user, publications, followeds, followers });
  } catch (error) {
    next(error);
    //res.send(error);
  }
};

export const searchUser = async (req, res, next) => {
  try {
    // capturar los parametros de consulta
    console.log(req.query);
    const { username } = req.query;
    // Eliminar los espacios extra de la entrada del usuario
    const trimmedUsername = username.replace(/\s+/g, " ").trim();

    // Crear una expresión regular para buscar el nombre de usuario, ignorando espacios adicionales
    const regex = new RegExp(trimmedUsername.split(" ").join("\\s*"), "i");

    const users = await User.find(
      { username: { $regex: regex } },
      { password: 0 }
    );

    res.send({ response: users });
  } catch (error) {
    next(error);
  }
};
