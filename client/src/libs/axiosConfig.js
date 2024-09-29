import axios from "axios";

/* Con withCredentials: true, Axios garantiza que cualquier cookie que el servidor establezca (por ejemplo, después de un inicio de sesión exitoso) se incluya en las solicitudes subsiguientes hechas con esta instancia. Esto es necesario para que el servidor pueda identificar y autenticar al usuario en futuras solicitudes. */

export const instance = axios.create({
  baseURL: "https://clon-instagram.onrender.com/api",
  withCredentials: true,
});
//http://localhost:5000/api
