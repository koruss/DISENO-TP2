var DAO = require('./DAO');
var PersonaSchema = require("../Schemas/PersonSchema.js");
var GrupoSchema = require("../Schemas/GrupoSchema.js");
var RamaSchema = require('../Schemas/RamaSchema.js');

module.exports = class GrupoDAO {
    dao = new DAO();
    personaSchema = new PersonaSchema();
    grupoSchema = new GrupoSchema();
    ramaSchema = new RamaSchema();

    constructor(){
    }

    //Funcion para hacer un post de un grupo en la base de datos
    async postGrupo(req,res){
        this.grupoSchema = new GrupoSchema();
        this.grupoSchema.nombreRama= req.body.selectedRama.value;
        this.grupoSchema.nombreGrupo= req.body.nombreGrupo;
        this.grupoSchema.monitores.push(req.body.selectedMonitor.datosPersona[0]);
        this.grupoSchema.miembros = [];
        this.grupoSchema.jefesGrupo = [];
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
        let personaRepetida = false;

        if (data.body.monitor.value=="Monitor"){
            let monitores = data.body.grupo.monitores;
            monitores.forEach(element => { 
                if(element._id == data.body.nombre.datosPersona[0]._id){
                    personaRepetida = true;
                }
            })
            if(personaRepetida!=true){
                this.dao.updateMonitorGrupo(data, GrupoSchema, res);
            }
            else{
                {res.json({success: false, err: "Ya esta persona es monitor de este grupo" })}
            }
        }

        else if (data.body.monitor.value=="Miembro"){
            let miembros = data.body.grupo.miembros;
            miembros.forEach(element => { 
                if(element._id == data.body.nombre.datosPersona[0]._id){
                    personaRepetida = true;
                }
            })
            if(personaRepetida!=true){
                this.dao.updateMiembroGrupo(data, GrupoSchema, res);
            }
            else{
                {res.json({success: false, err: "Ya esta persona es miembro de este grupo" })}
            }
        }

        else{
            let jefesGrupo = data.body.grupo.jefesGrupo;
            jefesGrupo.forEach(element => { 
                if(element._id == data.body.nombre.datosPersona[0]._id){
                    personaRepetida = true;
                }
            })
            if(personaRepetida!=true){
                this.dao.updateJefeGrupo(data, GrupoSchema, RamaSchema, res);
            }
            else{
                {res.json({success: false, err: "Ya esta persona es jefe de este grupo" })}
            }
        }
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