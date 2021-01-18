var Control = require('./Controlador/Control');
var Coordinacion= require('./Controlador/Coordinacion');
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const axios = require('axios');


const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));



// const buildPath = path.join(__dirname, '..', 'build');
// // add middlewares
// app.use(express.static(path.join(buildPath)));

// app.use((req, res, next) => {
//   res.sendFile(path.join(buildPath));
// });

// app.get('*', (req, res) => {
//   res.sendFile(path.join(buildPath, 'index.html')), function(err) {
//   if (err) {
//        res.status(500).send(err) 
//        }
//   };
// });



var cord = new Coordinacion("116", "tec", "San Jose.com", "asd", "090123", "dasd", "asd", "asd", "asd");
const control = new Control(cord);

app.use(session({
  secret: 'secret word',
  resave: false,
  saveUninitialized: true
}));

app.post('/guardarZona', (req, res) => {
    control.guardarZona(req, res);
})

//Funcion para guardar un miembro en la base de datos
app.post('/guardarMiembro', (req, res) => {
  control.guardarMiembro(req,res);
})

//Funcion para guardar un miembro en la base de datos
app.post('/guardarAsesor', (req, res) => {
  control.guardarAsesor(req,res);
})

app.post('/asignarMiembro', (req, res) => {
  control.asignarMiembro(req,res);
})


//Funcion para traer todas las zonas
app.post("/allZonas",(req,res)=>{
  control.allZonas(req, res);
})

app.post('/cambiarMiembroGrupo', (req, res) => {
  control.cambiarMiembroGrupo(req, res);
  })

app.post('/cambiarPosibleMonitor', (req, res) => {
  control.cambiarPosibleMonitor(req, res);
  })

app.post("/allRama",(req, res)=>{
  control.allRama(req,res);
})

app.post("/allPersona",(req, res)=>{
  control.allPersona(req,res);
})

app.post("/guardarRama",(req, res)=>{
  control.crearRama(req,res);
})

app.post("/guardarGrupo",(req, res)=>{
  control.guardarGrupo(req,res);
})

app.post("/cambiarNombreGrupo",(req, res)=>{
  control.cambiarNombreGrupo(req,res);
})

app.post("/allGrupos",(req, res)=>{
  control.allGrupos(req,res);
})

app.post("/getSesion",(req, res)=>{
  res.send(req.session);
  res.end();
})

app.post("/allAsesores",(req, res)=>{
  control.allAsesores(req,res);
})

app.post("/logIn",(req, res)=>{
  control.logIn(req,res);
})

app.post('/cerrarSesion', function (req, res) {
  control.cerrarSesion(req,res);
})

app.post('/guardarGrupo', function (req,res) {
  control.guardarGrupo(req,res);
})

app.post('/allRamaZona', function (req,res) {
  control.allRamaZona(req,res);
})

app.post('/allGruposRama', function (req,res) {
  control.allRamaZona(req,res);
})

app.post('/allMiembrosGrupos', function (req,res) {
  control.allMiembrosGrupos(req,res);
})

app.post('/allMovimientos', function (req,res) {
  control.allMovimientos(req,res);
})

app.post('/iniciarSesion', (req,res) => {
  control.iniciarSesion(req,res);
})

app.post('/enviarAporte', (req,res) => {
  control.enviarAporte(req,res);
})

app.post('/allMiembrosPorMiembro', (req,res) => {
  control.allMiembrosPorMiembro(req,res);
})

app.post('/allJefesPorMiembro', (req,res) => {
  control.allJefesPorMiembro(req,res);
})

app.post('/allMonitoresPorMiembro', (req,res) => {
  control.allMonitoresPorMiembro(req,res);
})

app.post('/obtenerAportes', (req,res) => {
  control.obtenerAportes(req,res);
})


app.post('/composicionGrupo',(req,res)=>{
  control.composicionGrupo(req,res);
})

app.post('/limpiarBandeja', (req,res) => {
  control.limpiarBandeja(req,res);
})
app.post('/composicionRama',(req,res)=>{
  //console.log("aqui toy")
  control.composicionRama(req,res);
})

app.post('/composicionZona',(req,res)=>{
  //console.log("aqui toy")
  control.composicionZona(req,res);
})

app.post('/nodeData',(req,res)=>{
  control.nodeData(req,res);
})

app.post('/CrearNoticia',(req,res)=>{
  control.CrearNoticia(req,res);
})
app.post('/infoPersona',(req,res)=>{
  control.infoPersona(req,res);
})

app.post('/getLugares',(req,res)=>{
  control.getLugares(req,res);
})




//la funcion del update
app.post('/updateEstadoNoticia',(req,res)=>{
  control.updateEstadoNoticia(req,res);
})


app.listen(PORT, () => console.log(`LISTENING ON PORT ${PORT}`));



