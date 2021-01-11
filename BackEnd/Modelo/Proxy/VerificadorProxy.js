"use strict";
exports.__esModule = true;
exports.VerificadorProxy = void 0;
var VerificadorReal_1 = require("./VerificadorReal");
var VerificadorProxy = /** @class */ (function () {
    function VerificadorProxy(id, password, personas, movimientos) {
        this.id = id;
        this.password = password;
        this.personas = personas;
        this.movimientos = movimientos;
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
        var _this = this;
        var auth = false;
        this.personas.forEach(function (persona) {
            var id_persona = persona.datosPersona[0].identificacion;
            var contra_persona = persona.datosPersona[0].contrasena;
            if (id == id_persona && password == contra_persona) {
                _this.type = persona.datosPersona[0].tipo;
                _this.nombre_persona = persona.datosPersona[0].nombre + " " + persona.datosPersona[0].apellido1 + " " + persona.datosPersona[0].apellido1;
                _this.id_persona = persona.datosPersona[0]._id;
                auth = true;
                var movimiento = _this.movimientos.find(function (element) { return element._id == persona.datosPersona[0].idMovimiento; });
                console.log(movimiento);
                _this.id_movimiento = movimiento._id;
                _this.nombre_movimiento = movimiento.nombre;
            }
        });
        return auth;
    };
    VerificadorProxy.prototype.getIdMovimiento = function () {
        return this.id_movimiento;
    };
    VerificadorProxy.prototype.getNombreMovimiento = function () {
        return this.nombre_movimiento;
    };
    VerificadorProxy.prototype.getNombrePersona = function () {
        return this.nombre_persona;
    };
    VerificadorProxy.prototype.getIdPersona = function () {
        return this.id_persona;
    };
    return VerificadorProxy;
}());
exports.VerificadorProxy = VerificadorProxy;
