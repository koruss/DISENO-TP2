var PersonaDAO = require('../DAO/PersonaDAO');
const {VerificadorProxy} = require('../Modelo/Proxy/VerificadorProxy.js');

module.exports = class GestorMiembro{
    miembros=[];
    personaDAO = new PersonaDAO();

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
        await this.personaDAO.getPersonas(req,res);
    }

    //Funcion para obtener los asesores
    async obtenerAsesores(req,res){
        await this.personaDAO.getAsesores(req,res);
    }

    //Funcion para cambiar si es un posible monitor a verdadero
    async posibleMonitor(req,res){
        await this.personaDAO.updatePosibleMonitor(req,res);
    }

    async iniciarSesion(req, res){
        var verificadorProxy = new VerificadorProxy(req.body.usuario, req.body.password, req.body.personas);
        verificadorProxy.iniciarSesion();
        //console.log(req.body);
    }

}