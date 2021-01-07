const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CompositeSchema = new Schema({
    idMovimiento: {
        type: mongoose.Schema.Types.ObjectId,
        default: null,
        ref: "Movimiento",
    },


    nombre: String,
    tipo: mongoose.Schema.Types.Number,
    children: [{
        type: mongoose.Schema.Types.ObjectId,
        default: null,
    }],
    miembros: [
        {
            type: mongoose.Schema.Types.ObjectId,
            default: null,
            ref: "Person",
        }
    ],
    jefes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Person",
            default: null
        }
    ],
    monitores: [
        {
            type: mongoose.Schema.Types.ObjectId,
            default: null,
            ref: "Person",
        }
    ]
})

module.exports = mongoose.model("Composite", CompositeSchema)