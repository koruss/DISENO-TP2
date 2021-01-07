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
        switch (this.type) {
            case '1':
                this.type = "MIEMBRO";
                break;
            case '2':
                this.type = "JEFE";
                break;
            case '3':
                this.type = "ASESOR";
                break;
            default:
                this.type = null;
                break;
        }
    };
    VerificadorReal.prototype.getTipo = function () {
        return this.type;
    };
    return VerificadorReal;
}());
exports.VerificadorReal = VerificadorReal;
