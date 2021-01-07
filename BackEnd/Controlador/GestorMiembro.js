const {FachadaLogIn} = require('../Modelo/Fachada/FachadaLogIn.js');
var DAO = require('../DAO/DAO');

module.exports = class GestorMiembro{
    miembros=[];
    DAO = new DAO();

    constructor(){
    }

    //Funcion que crea un objeto de tipo persona y lo envia para ser guardado
    async agregarMiembro(data, res){
        await this.DAO.postPersona(data, res)
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

    //Funcion para cambiar si es un posible monitor a verdadero
    async posibleMonitor(req,res){
        await this.personaDAO.updatePosibleMonitor(req,res);
    }

    async iniciarSesion(req, res){
        var fachadaLogIn = new FachadaLogIn(req.body.usuario, req.body.password, req.body.personas);
        var tipo = fachadaLogIn.iniciarSesionFachada();
        req.session.loggedIn = true;
        req.session.tipo = tipo;
        //guardar el id del movimiento aqui req.session.movimiento = movimiento
        res.json({tipo: tipo});
    }

}