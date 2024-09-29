import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const createToken = (id) => {
  const token = jwt.sign({ id: id }, process.env.SECRETWORD, {
    expiresIn: "3h",
  });
  return token;
};

/* 
  export const createToken = async(payload) => {
    return new Promise((resolve, reject) => {
        jwt.sign({...payload}, 'secret', {expiresIn : '1d'}, function(err, token) {
            if(err) {
                reject(new MyError('error al crear el token'))
            }else {
                resolve(token)
            }
        })
    })
    
}


export const decodifiedToken = async (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, 'secret', function(err, decoded) {
            if(err) {
                reject(new MyError(err.message))
            }else {
                resolve(decoded)
            }
        })
    })
}

*/
