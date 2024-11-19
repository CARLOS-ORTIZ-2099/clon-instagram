import jwt from "jsonwebtoken";

export const validateAuth = async (req, res, next) => {
  const { _token } = req.cookies;
  if (!_token) {
    return res.send({ msg: "logueate antes" });
  }
  try {
    // Si no se proporciona una devolución de llamada, la función actúa de forma sincrónica
    // verificando le jwt que se guardo en la cookies
    const decoded = jwt.verify(_token, process.env.SECRETWORD);
    //console.log(decoded);
    //const usuario = await Usuario.findById( {_id : decoded.id} )
    //console.log(usuario)
    // en el objeto global request guardo la info del valor decodificado
    // para tener acceso a el de manera global en las demas rutas
    req.user = decoded;
    next();
  } catch (error) {
    res.clearCookie("_token");
    return res.send({ msg: "no existe dicha cookie" });
  }
};
