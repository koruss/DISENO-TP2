const IAporte = require('./IAporte');
const DAO = require('../DAO/DAO');


module.exports = class Agradecimiento{
    dao = new DAO();

    async subirAporte(req,res) {
        await this.dao.subirAgradecimiento(req,res);
    }
}