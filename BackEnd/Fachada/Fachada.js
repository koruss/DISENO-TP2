const {VerificadorProxy} = require('../Modelo/Proxy/VerificadorProxy');


module.exports = class GestorMiembro{

    VerfProxy;

    constructor(id, password, personas, movimientos){
        this.VerfProxy = new VerificadorProxy(id, password, personas, movimientos);
    }

    async iniciarSesionFachada(req,res) {
        var tipo = this.VerfProxy.iniciarSesion();
        req.session.loggedIn = true;
        req.session.tipo = tipo;
        req.session.id_movimiento = this.VerfProxy.getIdMovimiento();
        req.session.nombre_movimiento = this.VerfProxy.getNombreMovimiento();
        req.session.nombre_persona = this.VerfProxy.getNombrePersona();
        req.session.id_persona = this.VerfProxy.getIdPersona();
        res.json({tipo: req.session.tipo});
    }
}
