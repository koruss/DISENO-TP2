var ZonaDAO = require('../DAO/ZonaDAO');
var RamaDAO = require('../DAO/RamaDAO');
var GrupoDAO = require('../DAO/GrupoDAO');
var DAO = require("../DAO/DAO")



module.exports = class GestorEstructura{
    zonaDAO = new ZonaDAO();
    ramaDAO = new RamaDAO();
    grupoDAO = new GrupoDAO();
    DAO= new DAO();
    zonas = [];

    constructor(){

    }

    crearZona(){

    }

    //Funcion para crear una rama, llama una funcion de ramaDAO
    async crearRama(req, res){
        await this.DAO.crearRama(req,res);
    }

    //Funcion para crear un grupo, llama una funcion de grupoDAO
    async crearGrupo(req,res){
        await this.DAO.crearGrupo(req,res);
    }
    
    async cargarComposite(){

    }

    //Funcion para obtener todas las zonas registradas en la base de datos
    async obtenerZonas(req,res){
        await this.DAO.allZonas(req,res);
    }

    //Funcion para obtener todas las ramas de todas las zonas
    async obtenerRamas(req,res){
        await this.DAO.allRamas(req,res);
    }
    async obtenerRamasZona(req,res){
        await this.DAO.allRamasZona(req,res);
    }


    //Funcion para obtener todos los grupos de la base de datos
    async obtenerGrupos(req,res){
        await this.DAO.allGrupos(req,res);
    }
    async obtenerGruposRama(req,res){
        await this.DAO.allGruposRama(req,res);
    }

    //Funcion para asignar un miembro en un grupo
    async asignarMiembro(req, res){
        await this.DAO.updateMiembroEnGrupo(req, res);
    }

    //Funcion para cambiarle el nombre a un grupo
    async cambiarNombreGrupo(req, res){
        await this.DAO.cambiarNombreGrupo(req, res);
    }

    //Funcion para trasladar un miembro de un grupo a otro
    async cambiarMiembroGrupo(req, res){
        await this.DAO.cambiarMiembroGrupo(req, res);
    }

    //Funcion para modificar una zona, se le agrega una rama que haya sido creada en la zona
    async modificarZona(req){
        await this.zonaDAO.updateZona(req);
    }

    //Funcion para modificar una rama, se le agrega un grupo que haya sido creada en la rama
    async modificarRama(req){
        await this.ramaDAO.updateRama(req);
    }

    //Funcion para guardar una zona
    async guardarZona(req, res){
        await this.DAO.crearZona(req,res);
    }

    async obtenerMovimientos(req, res){
        await this.DAO.obtenerMovimientos(req,res);
    }

    async obtenerAportes(req, res){
        await this.DAO.obtenerAportes(req,res);
    }

    clientCode(component) {
        console.log(`RESULT: ${component.operation()}`);
    }

    async composicionGrupo(req, res){
        await this.DAO.composicionGrupo(req,res);
    }

    async composicionRama(req, res){
        await this.DAO.composicionRama(req,res);
    }

    async composicionZona(req, res){
        await this.DAO.composicionZona(req,res);
    }
    
}
