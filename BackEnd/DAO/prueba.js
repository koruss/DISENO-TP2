var DAO = require('./DAO');
const CompositeSchema = require('../Schemas/CompositeSchema.js');
const PersonaSchema = require("../Schemas/PersonSchema.js");
const MovimientoSchema = require("../Schemas/MovimientoSchema.js");
const mongoose = require('mongoose');


const dbroute =
    'mongodb+srv://kenitoUwU:1234@tp-diseno.hwnkz.mongodb.net/PROGRA-1?authSource=admin&replicaSet=atlas-j7zojs-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true'
mongoose.connect(dbroute, { useNewUrlParser: true, useUnifiedTopology: true });
const state = mongoose.connection;
state.once('open', () => console.log('------->>> Conexion con MongoDB exitosa <<<------'));
state.on('error', console.error.bind(console, '------->>> Fallo en la conexión con MongoDB <<<------:'));



// CompositeSchema.find({ $or: [{ jefes: "5ff223c8b0b5c517c0b124e8" }, { monitores: "5ff223c8b0b5c517c0b124e8" }] }, (err, data) => {
//     if (err) {
//         console.log(err)
//     }
//     else {
//         console.log(data)
//     }
// })



CompositeSchema.find({tipo:3,monitores:"5ff223c8b0b5c517c0b124e8"}).populate("miembros").populate("jefes").populate("monitores").exec(function(err,data){//query de monitores de grupo
    if(err){console.log(err)}
    else{console.log(data)}
})
// CompositeSchema.find({_id:"5ff6548e9ebf9c2d88a18957",tipo:1},(err,data)=>{
//     if(err){
//         console.log(err);
//     }
//     else{
//         console.log(data)
//     }
// })


// let schema = new MovimientoSchema();
//     schema.nombre="Sempaii S.A";
//     schema.telefono="89101112";
//     schema.cedulaJuridica="123456789";
//     schema.direccionWeb="wwww.intagram/lombax09.com";
//     schema.direccion={
//         pais:"Costa Rica",
//         provincia:"Cartago",
//         canton:"Cot",
//         distrito:"Cot"
//     };

//     schema.save();

//   schema.nombre = "Anner";
//   schema.save();


// CompositeSchema.findOne({nombre:"Cruz Roja"},function(err,data){
//     if(err){
//         console.log(err)
//     }
//     else{
//         console.log(data._id)
//         CompositeSchema.update({_id:data._id},{$addToSet:{children:schema._id}}, function(err,success){
//             if(err){
//                 console.log(err)
//             }
//             else{
//                 console.log(success)
//             }
//         })
//     }
// })


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

// CompositeSchema.findOne({nombre:"Zona n+1"}).populate("children").exec(function(err,data){
//     if(err){
//         console.log(err)
//     }
//     else{
//         console.log(data)
//         const respuesta=data.children;
//         // respuesta.map((element,index) => {
//         respuesta.forEach(element => {
//             console.log(element)
//         });
//     }
// })