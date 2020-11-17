var DAO = require('./DAO');
var PersonaSchema = require("../Schemas/PersonSchema.js");
var GrupoSchema = require("../Schemas/GrupoSchema.js");
var RamaSchema = require('../Schemas/RamaSchema.js');

module.exports = class GrupoDAO {
    dao = new DAO();
    personaSchema = new PersonaSchema();
    grupoSchema = new GrupoSchema();

    constructor(){
    }

    //Funcion para hacer un post de un grupo en la base de datos
    async postGrupo(req,res){
        this.grupoSchema = new GrupoSchema();
        this.grupoSchema.nombreRama= req.body.selectedRama.value;
        this.grupoSchema.nombreGrupo= req.body.nombreGrupo;
        await this.dao.crearGrupo(this.grupoSchema, RamaSchema, req, res);
    }

    updatePersona(data){

    }

    //Funcion encargada de obtener todas las zonas de la base de datos
    async getGrupos(req, res){
        this.dao.getData(GrupoSchema, res);
        const respuesta = res.data;
    }

    //Funcion para anadir un miembro a un grupo
    async updateMiembroEnGrupo(data, res){
        this.dao.updateMiembroEnGrupo(data, GrupoSchema, PersonaSchema, res);
    }

    //Funcion para cambiar el nombre de un grupo
    async cambiarNombreGrupo(data, res){
        this.dao.cambiarNombreGrupo(data, GrupoSchema, res);
    }

    //Funcion para trasladar un miembro de un grupo a otro
    async trasladarMiembro(data, res){
        this.dao.trasladarMiembro(data.body, GrupoSchema, res);
    }

 }