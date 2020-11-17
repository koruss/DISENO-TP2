const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Esquema de la rama en la base de datos
const RamaSchema = new Schema(
    {
        idCoordinacion:String,
        nombreRama:String,
        zona: String,
        monitores:Array,
        jefesRama:Array,
        grupos: {
            type: Array,
            nombre: String
        },
        jefesGrupo: {
            id: String,
            nombre: String,
            apellido: String,
            type: Array
        }   
    }
);

module.exports= mongoose.model("Rama",RamaSchema)