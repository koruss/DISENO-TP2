"use strict";
exports.__esModule = true;
exports.Main = void 0;
var CompositePersona_1 = require("./CompositePersona");
var LeafPersona_1 = require("./LeafPersona");
var Main = /** @class */ (function () {
    function Main() {
    }
    Main.prototype.clientCode = function (component) {
        console.log("RESULT: " + component.operation());
    };
    //------------- TODO
    //TODO: CAMBIAR EL TIPO A UN ENUM POR EJEMPLO "JEFE", "ZONA" ETC ETC
    Main.prototype.prueba = function () {
        var persona1 = new LeafPersona_1.LeafPersona(33, "Juan", "activo", 50095967, "josue2@gmail.com", 'direccion_persona', "Jefe");
        var persona2 = new LeafPersona_1.LeafPersona(34, "Anner", "activo", 777777, "anner@gmail.com", 'direccion_persona', "Jefe");
        var zona = new CompositePersona_1.CompositePersona(1, "Zona miedo", "Activa", 3223232, "Zona1@gmail.com", 'direccion_persona', "Zona");
        var rama = new CompositePersona_1.CompositePersona(1, "Rama miedo", "Activa", 3223232, "Rama1@gmail.com", 'direccion_persona', "Rama");
        rama.anadirHijo(persona1);
        rama.anadirHijo(persona2);
        zona.anadirHijo(rama);
        console.log('-----------');
        console.log('Composicion');
        this.clientCode(zona);
        console.log('-----------');
    };
    return Main;
}());
exports.Main = Main;
