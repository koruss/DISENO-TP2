const { Mongoose } = require("mongoose");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Esquema de asesor de la base de datos
const MovimientoSchema= new Schema(
    {
        nombre:String,
        telefono:String,
        aportes:[{
            tipo:String,
            detalle:String
        }],
        cedulaJuridica:String,
        direccionWeb: String,
        direccion: {
            pais: String,
            provincia: String,
            canton:String,
            distrito: String
        },
        

    }
);

module.exports = mongoose.model("Movimiento", MovimientoSchema);