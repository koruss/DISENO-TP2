const IAporte = require('./IAporte');
const DAO = require('../DAO/DAO');

module.exports = class Petitoria{
    dao = new DAO();

    async subirAporte(req,res) {
        await this.dao.subirPetitoria(req,res);
    }
}