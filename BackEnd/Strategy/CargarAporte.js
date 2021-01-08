const IAporte = require('./IAporte');

module.exports = class CargarAporte{

    tipoAporte;

    constructor() {
    }

    async cargarDatos(req,res) {
        await this.tipoAporte.subirAporte(req,res);
    }

    setStrategy(tipoAporte){
        this.tipoAporte = tipoAporte;
    }
}