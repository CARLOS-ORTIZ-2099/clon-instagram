import { Follower } from "../models/Follower.js";
import { User } from "../models/User.js";
import { MyError } from "../error/MyError.js";

export const followToUser = async (req, res, next) => {
  try {
    // aqui nos llegara los datos (id) del usuario al que seguiremos
    const { body } = req;

    // luego recogemos el id del usuario autenticado(usuario seguidor)
    const { id: userId } = req.user;

    // primero comprobamos que el usuario no puede tener la accion de seguirse a si mismo
    if (body.followed === userId) {
      return next(new MyError("no puedes seguirte a ti mismo"));
    }

    // luego verificamos que el usuario a seguir exista
    const userFound = await User.findById({ _id: body.followed });
    if (!userFound) {
      return next(new MyError("el usuario que intentas seguir no existe"));
    }

    // tambien evitamos que el usuario autenticado pueda seguir 2 veces a otro usuario
    const followedfound = await Follower.findOne({
      followedUser: body.followed,
      followerUser: userId,
    });
    console.log(followedfound);
    // prevenimos la accion de que el usuario se pueda seguir asi mismo
    if (followedfound) {
      return next(new MyError("ya estas siguiendo al usuario"));
    }

    // crear el follower
    const createFollower = new Follower({
      followedUser: body.followed,
      followerUser: userId,
    });
    await createFollower.save();
    res.status(201).send(createFollower);
  } catch (error) {
    console.log("entro aqui");
    next(error);
  }
};

export const deleteFollowed = async (req, res, next) => {
  try {
    //  id del usuario seguido que se quiere dejar de seguir
    const { id } = req.params;

    const { id: userId } = req.user;

    // luego elimino de la db al usuario seguido de la collecion Follower que coincida con los parametros dados
    const followerDelete = await Follower.findOneAndDelete({
      followedUser: id,
      followerUser: userId,
    });

    if (!followerDelete) {
      return next(new MyError("el usuario al que sigues no existe"));
    }

    res.send({ followerDelete });
  } catch (error) {
    console.log("entro aqui");
    next(error);
  }
};

export const getFolloweds = async (req, res, next) => {
  try {
    // id del usuario al que se quiere ver sus seguidos
    let { id } = req.params;
    const userId = req.user.id;
    !id ? (id = userId) : "";

    // buscar en la db los seguidos de dicho usuario
    const response = await Follower.find({ followerUser: id }).populate(
      "followedUser",
      "-password"
    );
    //.populate("followerUser", "-password");

    res.send(response);
  } catch (error) {
    console.log(error);
  }
};

export const getFollowers = async (req, res, next) => {
  try {
    // id del usuario al que se quiere ver sus seguidores
    let { id } = req.params;
    const userId = req.user.id;
    !id ? (id = userId) : "";

    const response = await Follower.find({ followedUser: id }).populate(
      "followerUser",
      "-password"
    );
    res.send(response);
  } catch (error) {
    console.log(error);
  }
};
