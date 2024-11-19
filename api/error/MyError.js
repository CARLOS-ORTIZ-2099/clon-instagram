// heredando del objeto global Error del lenguaje de programacion
// nuestra clase MyError tendra 2 propiedades que hereradan de la super clase Error
// ya que el objeto global Error tiene ya definido esas 2 propiedades

export class MyError extends Error {
  constructor(message, cause, statusCode) {
    // la clase myError va a heredar esas 2 propiedades que ya vienen predefinidas en el objeto Error
    super(message);
    this.cause = cause;
    this.statusCode = statusCode;
  }
}
