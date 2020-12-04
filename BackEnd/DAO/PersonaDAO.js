var DAO = require('./DAO');
var PersonaSchema = require("../Schemas/PersonSchema.js");
var AsesorSchema = require("../Schemas/AsesorSchema.js");
const PersonSchema = require('../Schemas/PersonSchema.js');

module.exports = class PersonDao {
    List = [];
    dao = new DAO();
    personaSchema = new PersonaSchema();
    asesorSchema = new AsesorSchema();

    constructor(){
    }

    //Funcion encargada de guardar un nuevo usuario en la base de datos
    async postPersona(data, res){
        this.personaSchema = new PersonaSchema();
        const direccion = {
            pais: data.pais.value,
            provincia: data.provincia.value,
            canton: data.canton.value,
            distrito: data.distrito.value
        }
        this.personaSchema.nombre=data.nombre;
        this.personaSchema.identificacion=data.identificacion;
        this.personaSchema.apellido1=data.apellido1;
        this.personaSchema.apellido2=data.apellido2;
        this.personaSchema.estado=false;
        this.personaSchema.posibleMonitor=false;
        this.personaSchema.telefono=data.celular;
        this.personaSchema.correo=data.correo;
        this.personaSchema.direccion=direccion;
        await this.dao.postData(this.personaSchema, res);
    }

    //Funcion encargada de guardar un nuevo usuario en la base de datos
    async postAsesor(data, res){
        this.asesorSchema.usuario=data.usuario;
        this.asesorSchema.contrasena=data.contrasena;
        await this.dao.postData(this.asesorSchema, res);
    }

    updatePersona(data){

    }

    //Funcion para obtener todas las personas 
    async getPersonas(req, res){
        await this.dao.getData(PersonaSchema, res);
    }

    //Funcion para obtener los asesores
    async getAsesores(req, res){
        this.dao.getOneData(AsesorSchema, "usuario",req,res);
        const respuesta = res.data;
    }

    //Funcion para cambiar la bandera de posible monitor
    async updatePosibleMonitor(req, res){
        await this.dao.updatePosibleMonitor(req, res, PersonSchema);
    }

 }