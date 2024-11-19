import path from "path";
import url from "url";

export function findRoutes(dir) {
  // Convierte la URL del módulo a una ruta de archivo
  const __filename = url.fileURLToPath(import.meta.url);
  //console.log(__filename.blue);
  // Obtiene el directorio del archivo
  const __dirname = path.dirname(path.dirname(__filename));
  //console.log(__dirname.red);
  if (dir) {
    return path.resolve(__dirname, dir);
  } else {
    return path.resolve(__dirname);
  }
}
