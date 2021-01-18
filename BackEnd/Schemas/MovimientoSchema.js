const { Mongoose } = require("mongoose");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Esquema de asesor de la base de datos
const MovimientoSchema= new Schema(
    {
        nombre:String,
        telefono:String,
        aportes:{
            petitoria:[{
                detalle:String,
                nombre: String,
                fecha: String
            }],
            agradecimiento:[{
                detalle:String,
                nombre: String,
                fecha: String
            }],
            ofrecimiento:[{
                detalle:String,
                nombre: String,
                fecha: String
            }]
        },
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