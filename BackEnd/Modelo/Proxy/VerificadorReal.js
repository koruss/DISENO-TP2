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
        console.log("Aqui llamar al facade correspondiente");
    };
    return VerificadorReal;
}());
exports.VerificadorReal = VerificadorReal;
