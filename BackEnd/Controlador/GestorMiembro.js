var DAO = require('../DAO/DAO');
var PersonaDAO = require("../DAO/PersonaDAO");

module.exports = class GestorMiembro{
    miembros=[];
    DAO = new DAO();
    personaDAO=new PersonaDAO();

    constructor(){
    }

    //Funcion que crea un objeto de tipo persona y lo envia para ser guardado
    async agregarMiembro(data, res){
        await this.personaDAO.postPersona(data, res)
    }

    //Funcion que crea un objeto de tipo persona y lo envia para ser guardado
    async agregarAsesor(data, res){
        let response = await this.personaDAO.postAsesor(data, res)
    }

    //Funcion para cambiar un miembro de grupo
    cambiarMiembroGrupo(data, res){
        this.personaDAO.updatePersona(data, res);
    }

    //Funcion para obtener todas las personas registradas
    async obtenerPersonas(req,res){
        await this.DAO.allPersonas(req,res);
    }

    async obtenerPersonasGrupo(req,res){
        await this.DAO.allMiembrosGrupo(req,res);
    }

    //Funcion para obtener los asesores
    async obtenerAsesores(req,res){
        await this.personaDAO.getAsesores(req,res);
    }


}