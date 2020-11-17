const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Esquema de grupo de la base de datos
const GrupoSchema = new Schema(
    {
        idCoordinacion:String,
        nombreRama:String,
        nombreGrupo:String,
        monitores:Array,
        jefesGrupo:Array,
        nombreGrupo:String,
        miembros:Array
    }
);

module.exports= mongoose.model("Grupo",GrupoSchema)