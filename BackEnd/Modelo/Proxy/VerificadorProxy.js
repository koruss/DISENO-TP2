"use strict";
exports.__esModule = true;
exports.VerificadorProxy = void 0;
var VerificadorReal_1 = require("./VerificadorReal");
var VerificadorProxy = /** @class */ (function () {
    function VerificadorProxy(id, password, type) {
        this.id = id;
        this.password = password;
        this.type = type;
        this.VerfReal = null;
        console.log("Proxy iniciado");
    }
    VerificadorProxy.prototype.iniciarSecion = function (id, password) {
        if (!this.credencialesValidas(id, password)) {
            if (this.VerfReal == null) {
                this.VerfReal = new VerificadorReal_1.VerificadorReal(this.id, this.password, this.type);
            }
            this.VerfReal.iniciarSecion(id, password);
        }
        else {
            console.log("No tiene acceso");
        }
    };
    VerificadorProxy.prototype.credencialesValidas = function (id, password) {
        if (id == "Anner" && password == "Josue") {
            return true;
        }
        else {
            return false;
        }
    };
    return VerificadorProxy;
}());
exports.VerificadorProxy = VerificadorProxy;
