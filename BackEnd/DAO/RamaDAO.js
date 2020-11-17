var DAO = require('./DAO');
var RamaSchema = require('../Schemas/RamaSchema.js');
var ZonaSchema = require("../Schemas/ZonaSchema.js");


module.exports = class RamaDao {
    List = [];
    dao = new DAO();
    ramaSchema = new RamaSchema();

    constructor(){
    }

    //Funcion encargada de guardar una nueva zona en la base de datos
    async postRama(req, res){
        this.ramaSchema = new RamaSchema();
        this.ramaSchema.idCoordinacion="PRUEBA"; 
        this.ramaSchema.nombreRama=req.body.nombreRama;
        this.ramaSchema.zona = req.body.selectedZona.value;
        this.ramaSchema.monitores = [];
        this.ramaSchema.jefesRama = [];
        await this.dao.crearRama(this.ramaSchema,ZonaSchema, req, res);
    }
    
    //Funcion para modificar una rama
    async updateRama(req){
        this.dao.modificarRama(req, RamaSchema);
    }

    //Funcion encargada de obtener todas las ramas de la base de datos
    async getRamas(req, res){
        this.dao.getData(RamaSchema, res);
        const respuesta = res.data;
    }

    //Funcion para cambiar el nombre de un grupo
    async cambiarNombreGrupo(req, res){
        this.dao.cambiarNombreGrupo(req, RamaSchema, res);
    }


    //Funcion encargada de modificar una rama
    async updateRama(req, res){
        this.dao.modificarRama(req, RamaSchema, res);
    }

 }