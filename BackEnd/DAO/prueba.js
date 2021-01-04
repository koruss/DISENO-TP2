var DAO = require('./DAO');
const CompositeSchema = require('../Schemas/CompositeSchema.js');
const PersonaSchema = require("../Schemas/PersonSchema.js");
const mongoose = require('mongoose');




const dbroute =
'mongodb+srv://kenitoUwU:1234@tp-diseno.hwnkz.mongodb.net/PROGRA-1?authSource=admin&replicaSet=atlas-j7zojs-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true'
mongoose.connect(dbroute, { useNewUrlParser: true, useUnifiedTopology: true });
const state = mongoose.connection;
state.once('open', () => console.log('------->>> Conexion con MongoDB exitosa <<<------'));
state.on('error', console.error.bind(console, '------->>> Fallo en la conexión con MongoDB <<<------:'));

let schema = new CompositeSchema();

//   schema.nombre = "Anner";
//   schema.save();


CompositeSchema.findOne({nombre:"Cruz Roja"},function(err,data){
    if(err){
        console.log(err)
    }
    else{
        console.log(data._id)
        CompositeSchema.update({_id:data._id},{$addToSet:{children:schema._id}}, function(err,success){
            if(err){
                console.log(err)
            }
            else{
                console.log(success)
            }
        })
    }
})


// CompositeSchema.update({"nombre":"San Jose"},{ $addToSet:{children:"Miercoles"}}, function(err, success){
//     if(err){
//         console.log(err)
//     }
//     else{
//         console.log(success)
//     }
// })


// PersonaSchema.findOne({nombre:"11"}, (err,data)=>{
//     if(err){
//         console.log(err);
//     }
//     else{
//         CompositeSchema.update({"nombre":"Cruz Roja"},{ $addToSet:{jefes:data._id}}, (err,success)=>{
//             if(err){
//                  console.log(err)
//             }
//             else{
//                 console.log(success)
//             }
//         })
//     }

// })

CompositeSchema.findOne({nombre:"Cruz Roja"}).populate("jefes").exec(function(err,data){
    if(err){
        console.log(err)
    }
    else{
        console.log(data.jefes[0].nombre)
    }
})