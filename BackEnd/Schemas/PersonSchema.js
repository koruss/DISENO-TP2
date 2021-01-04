const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Esquema de persona de la base de datos
const PersonSchema= new Schema(
    {
      identificacion: String,
      contrasena: String,
      nombre: String,
      apellido1: String,
      apellido2: String,
      telefono: String,
      correo: String,
      posibleMonitor: Boolean,
      direccion: {
          pais: String,
          provincia: String,
          canton:String,
          distrito: String
      }   
    }
);

module.exports = mongoose.model("Person", PersonSchema);