var DAO = require('./DAO');
var ZonaSchema = require("../Schemas/ZonaSchema.js");

module.exports = class ZonaDAO {
    List = [];
    dao = new DAO();
    zonaSchema = new ZonaSchema();

    constructor(){
    }

    //Funcion encargada de guardar una nueva zona en la base de datos
    async postZona(req, res){
        this.zonaSchema = new ZonaSchema();
        this.zonaSchema.nombreZona= req.body.nombreZona;
        await this.dao.postData(this.zonaSchema, res);
    }

    //Funcion para modificar una zona
    async updateZona(req){
        this.dao.modificarZona(req, ZonaSchema);
    }

    //Funcion encargada de obtener todas las zonas de la base de datos
    async getZonas(req, res){
        this.dao.getData(ZonaSchema, res);
    }

 }