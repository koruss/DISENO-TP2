"use strict";
exports.__esModule = true;
exports.FachadaLogIn = void 0;
var VerificadorProxy_1 = require("../Proxy/VerificadorProxy");
var FachadaLogIn = /** @class */ (function () {
    function FachadaLogIn(id, password, personas) {
        this.VerfProxy = new VerificadorProxy_1.VerificadorProxy(id, password, personas);
    }
    FachadaLogIn.prototype.iniciarSesionFachada = function () {
        var tipo = this.VerfProxy.iniciarSesion();
        return tipo;
    };
    return FachadaLogIn;
}());
exports.FachadaLogIn = FachadaLogIn;
