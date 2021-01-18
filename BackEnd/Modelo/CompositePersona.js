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
exports.CompositePersona = void 0;
var AbstractPersona_1 = require("./AbstractPersona");
var CompositePersona = /** @class */ (function (_super) {
    __extends(CompositePersona, _super);
    function CompositePersona(id, nombre, estado, telefono, correo, direccion, tipo) {
        var _this = _super.call(this, id, nombre, estado, telefono, correo, direccion, tipo) || this;
        _this.hijos = [];
        return _this;
    }
    //anade un hijo al composite
    CompositePersona.prototype.anadirHijo = function (hijo) {
        this.hijos.push(hijo); //Agregamos un hijo a este composite
        hijo.setParent(this); //Al hijo de este composite le decimos que este es el padre
    };
    //Removemos un hijo del composite
    CompositePersona.prototype.removerHijo = function (hijo) {
        var componentIndex = this.hijos.indexOf(hijo);
        this.hijos.splice(componentIndex, 1);
        hijo.setParent(null);
    };
    //Retorna si es un composite
    CompositePersona.prototype.isComposite = function () {
        return true;
    };
    //Operacion para recorrer el composite por completo (se utiliza como ejemplo para ver la forma recursiva de recorrido)
    CompositePersona.prototype.operation = function () {
        var results = [];
        for (var _i = 0, _a = this.hijos; _i < _a.length; _i++) {
            var hijo = _a[_i];
            results.push(hijo.operation());
        }
        return "Branch(" + results.join('+') + ")";
    };
    return CompositePersona;
}(AbstractPersona_1.AbstractPersona));
exports.CompositePersona = CompositePersona;
