const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Esquema de persona de la base de datos
const PersonSchema= new Schema(
    {
      tipo: String,
      idMovimiento:{
            type: mongoose.Schema.Types.ObjectId,
            default: null,
            ref:"Movimiento",
      },
      zonas: [
        {
          type: mongoose.Schema.Types.ObjectId,
          default: null,
          ref:"Composite",
        }
      ],
      ramas: [
        {
          type: mongoose.Schema.Types.ObjectId,
          default: null,
          ref:"Composite",
        }
      ],
      grupos: [
        {
          type: mongoose.Schema.Types.ObjectId,
          default: null,
          ref:"Composite",
        }
      ],
      identificacion: String,
      contrasena: String,
      nombre: String,
      apellido1: String,
      apellido2: String,
      telefono: String,
      correo: String,
      posibleMonitor: Boolean,
      noticia: [
        {
          autor: String,
          fecha: String,
          noticia: String,
          isPendiente: Boolean
        }
      ],
      direccion: {
          pais: String,
          provincia: String,
          canton:String,
          distrito: String
      }   
    }
);

module.exports = mongoose.model("Person", PersonSchema);