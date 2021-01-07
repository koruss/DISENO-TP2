const {VerificadorProxy} = require('../Modelo/Proxy/VerificadorProxy');


module.exports = class GestorMiembro{

    VerfProxy;

    constructor(id, password, personas){
        this.VerfProxy = new VerificadorProxy(id, password, personas);
    }

    async iniciarSesionFachada(req,res) {
        //aqui van mas metodos mas adelante
        var tipo = this.VerfProxy.iniciarSesion();
        req.session.loggedIn = true;
        req.session.tipo = tipo;
        res.json({tipo: req.session.tipo});
    }
}
