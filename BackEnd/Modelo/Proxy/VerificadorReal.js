"use strict";
exports.__esModule = true;
exports.VerificadorReal = void 0;
var VerificadorReal = /** @class */ (function () {
    function VerificadorReal(id, password, type) {
        this.id = id;
        this.password = password;
        this.type = type;
    }
    VerificadorReal.prototype.iniciarSesion = function () {
        //Hacer un if con el tipo o algo
        this.type = "ASESOR";
    };
    VerificadorReal.prototype.getTipo = function () {
        return this.type;   
    };
    return VerificadorReal;
}());
exports.VerificadorReal = VerificadorReal;
