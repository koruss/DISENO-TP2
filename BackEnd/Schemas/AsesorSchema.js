const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Esquema de asesor de la base de datos
const AsesorSchema= new Schema(
    {
      usuario: String,
      contrasena: String,  
    }
);

module.exports = mongoose.model("Asesor", AsesorSchema);