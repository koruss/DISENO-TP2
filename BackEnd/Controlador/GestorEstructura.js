var ZonaDAO = require('../DAO/ZonaDAO');
var RamaDAO = require('../DAO/RamaDAO');
var GrupoDAO = require('../DAO/GrupoDAO')



module.exports = class GestorEstructura{
    zonaDAO = new ZonaDAO();
    ramaDAO = new RamaDAO();
    grupoDAO = new GrupoDAO();
    zonas = [];

    constructor(){

    }

    crearZona(){

    }

    //Funcion para crear una rama, llama una funcion de ramaDAO
    async crearRama(req, res){
        await this.ramaDAO.postRama(req,res);
    }

    //Funcion para crear un grupo, llama una funcion de grupoDAO
    async crearGrupo(req,res){
        await this.grupoDAO.postGrupo(req,res);
    }
    
    async cargarComposite(){

    }

    //Funcion para obtener todas las zonas registradas en la base de datos
    async obtenerZonas(req,res){
        await this.zonaDAO.getZonas(req,res);
    }

    //Funcion para obtener todas las ramas de todas las zonas
    async obtenerRamas(req,res){
        await this.ramaDAO.getRamas(req,res);
    }

    //Funcion para obtener todos los grupos de la base de datos
    async obtenerGrupos(req,res){
        await this.grupoDAO.getGrupos(req,res);
    }

    //Funcion para asignar un miembro en un grupo
    async asignarMiembro(req, res){
        await this.grupoDAO.updateMiembroEnGrupo(req, res);
    }

    //Funcion para cambiarle el nombre a un grupo
    async cambiarNombreGrupo(req, res){
        await this.grupoDAO.cambiarNombreGrupo(req, res);
    }

    //Funcion para trasladar un miembro de un grupo a otro
    async trasladarMiembro(req, res){
        await this.grupoDAO.trasladarMiembro(req, res);
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
        await this.zonaDAO.postZona(req,res);
    }

    clientCode(component) {
        console.log(`RESULT: ${component.operation()}`);
    }

    
}
