var DAO = require('./DAO');
const CompositeSchema = require('../Schemas/CompositeSchema.js');
const mongoose = require('mongoose');




const dbroute =
'mongodb+srv://kenitoUwU:1234@tp-diseno.hwnkz.mongodb.net/PROGRA-1?authSource=admin&replicaSet=atlas-j7zojs-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true'
mongoose.connect(dbroute, { useNewUrlParser: true, useUnifiedTopology: true });
const state = mongoose.connection;
state.once('open', () => console.log('------->>> Conexion con MongoDB exitosa <<<------'));
state.on('error', console.error.bind(console, '------->>> Fallo en la conexión con MongoDB <<<------:'));

let schema = new CompositeSchema();

//  schema.nombre = "San Jose";
//  schema.save();


// CompositeSchema.find({"nombre":"Cruz Roja"},function(err,data){
//     if(err){
//         console.log(err)
//     }
//     else{
//         console.log(data)
//         CompositeSchema.update({_id:data._id},{$addToSet:{children:"San Jose"}} )
//     }
// })


CompositeSchema.update({"nombre":"Cruz Roja"},{ $addToSet:{children:"San Jose"}} )


