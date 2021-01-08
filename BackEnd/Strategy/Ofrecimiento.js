const IAporte = require('./IAporte');
const DAO = require('../DAO/DAO');

module.exports = class Ofrecimiento{
    dao = new DAO();

    async subirAporte(req,res) {
        await this.dao.subirOfrecimiento(req,res);
    }
}