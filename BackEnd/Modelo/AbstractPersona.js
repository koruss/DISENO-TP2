"use strict";
exports.__esModule = true;
exports.AbstractPersona = void 0;
var AbstractPersona = /** @class */ (function () {
    function AbstractPersona(id, nombre, estado, telefono, correo, direccion, tipo) {
        this.id = id;
        this.nombre = nombre;
        this.estado = estado;
        this.telefono = telefono;
        this.correo = correo;
        this.direccion = direccion;
        this.tipo = tipo;
    }
    //Establece el padre composite
    AbstractPersona.prototype.setParent = function (parent) {
        this.parent = parent;
    };
    //Retorna el padre del composite
    AbstractPersona.prototype.getParent = function () {
        return this.parent;
    };
    //Funcion para anadir un hijo a algun composite
    AbstractPersona.prototype.anadirHijo = function (hijo) { };
    //Funcion para remover un hijo del composite
    AbstractPersona.prototype.removerHijo = function (hijo) { };
    //Funcion para saber si es un composite
    AbstractPersona.prototype.isComposite = function () {
        return false;
    };
    AbstractPersona.prototype.getNombre = function () {
        return this.nombre;
    };
    AbstractPersona.prototype.setNombre = function (nombre) {
        this.nombre = nombre;
    };
    AbstractPersona.prototype.setEstado = function () { };
    AbstractPersona.prototype.getEstado = function () { };
    return AbstractPersona;
}());
exports.AbstractPersona = AbstractPersona;
