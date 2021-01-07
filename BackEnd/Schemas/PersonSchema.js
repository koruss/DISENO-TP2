const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Esquema de persona de la base de datos
const PersonSchema= new Schema(
    {
      tipo: mongoose.Schema.Types.Number,
      tipoPersona: String,
      idMovimiento:{
            type: mongoose.Schema.Types.ObjectId,
            default: null,
            ref:"Movimiento",
      },
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