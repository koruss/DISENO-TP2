"use strict";
exports.__esModule = true;
exports.VerificadorProxy = void 0;
var VerificadorReal_1 = require("./VerificadorReal");
var VerificadorProxy = /** @class */ (function () {
    function VerificadorProxy(id, password, personas) {
        this.id = id;
        this.password = password;
        this.personas = personas;
    }
    VerificadorProxy.prototype.iniciarSesion = function () {
        if (this.credencialesValidas(this.id, this.password)) {
            if (this.VerfReal == null) {
                this.VerfReal = new VerificadorReal_1.VerificadorReal(this.id, this.password, this.type);
            }
            this.VerfReal.iniciarSesion();
            return this.VerfReal.getTipo();
        }
        else {
            return null;
        }
    };
    VerificadorProxy.prototype.credencialesValidas = function (id, password) {
        var auth = false;
        this.personas.forEach(function (persona) {
            var id_persona = persona.datosPersona[0].identificacion;
            var contra_persona = persona.datosPersona[0].contrasena;
            if (id == id_persona && password == contra_persona) {
                auth = true;
            }
        });
        return auth;
    };
    return VerificadorProxy;
}());
exports.VerificadorProxy = VerificadorProxy;
