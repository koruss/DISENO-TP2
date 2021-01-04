"use strict";
exports.__esModule = true;
exports.VerificadorProxy = void 0;
var VerificadorReal_1 = require("./VerificadorReal");
var PersonaDAO = require('../../DAO/PersonaDAO');
var VerificadorProxy = /** @class */ (function () {
    function VerificadorProxy(id, password, personas) {
        this.id = id;
        this.password = password;
        this.personas = personas;
        this.VerfReal = null;
        console.log("Proxy iniciado");
    }
    VerificadorProxy.prototype.iniciarSesion = function () {
        if (this.credencialesValidas(this.id, this.password)) {
            if (this.VerfReal == null) {
                this.VerfReal = new VerificadorReal_1.VerificadorReal(this.id, this.password, this.type);
            }
            this.VerfReal.iniciarSesion();
        }
        else {
            console.log("No tiene acceso");
        }
    };
    VerificadorProxy.prototype.credencialesValidas = function (id, password) {
        var auth = false;
        this.personas.forEach(function (persona) {
            console.log(persona.datosPersona[0].identificacion);
            console.log(id);
            if (id == persona.datosPersona[0].identificacion) {
                console.log("alo");
                auth = true;
            }
        });
        return auth;
    };
    return VerificadorProxy;
}());
exports.VerificadorProxy = VerificadorProxy;
