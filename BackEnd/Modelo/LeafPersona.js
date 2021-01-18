"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.LeafPersona = void 0;
var AbstractPersona_1 = require("./AbstractPersona");
var LeafPersona = /** @class */ (function (_super) {
    __extends(LeafPersona, _super);
    function LeafPersona(id, nombre, estado, telefono, correo, direccion, tipo) {
        return _super.call(this, id, nombre, estado, telefono, correo, direccion, tipo) || this;
    }
    LeafPersona.prototype.operation = function () {
        //return this.getNombre();
        return this.getNombre();
    };
    return LeafPersona;
}(AbstractPersona_1.AbstractPersona));
exports.LeafPersona = LeafPersona;
