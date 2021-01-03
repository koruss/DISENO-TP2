const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CompositeSchema = new Schema({
    nombre: String,
    children: [{
        // type: mongoose.Schema.Types.ObjectId,
        type: String,
        default: null,
    }],
    miembros: [
        {
            type: mongoose.Schema.Types.ObjectId,
            default: null
        }
    ],
    jefes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            default: null
        }
    ],
    monitores: [
        {
            type: mongoose.Schema.Types.ObjectId,
            default: null
        }
    ]
})

module.exports= mongoose.model("Composite",CompositeSchema)