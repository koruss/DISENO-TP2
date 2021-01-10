var DAO = require('../DAO/DAO');
var Fachada = require('../Fachada/Fachada');
const Agradecimiento = require('../Strategy/Agradecimiento');
var CargarAporte = require('../Strategy/CargarAporte');
const Ofrecimiento = require('../Strategy/Ofrecimiento');
const Petitoria = require('../Strategy/Petitoria');

module.exports = class GestorMiembro{
    miembros=[];
    DAO = new DAO();

    constructor(){
    }

    //Funcion que crea un objeto de tipo persona y lo envia para ser guardado
    async agregarMiembro(data, res){
        await this.DAO.postPersona(data, res)
    }

    //Funcion que crea un objeto de tipo persona y lo envia para ser guardado
    async agregarAsesor(data, res){
        let response = await this.personaDAO.postAsesor(data, res)
    }

    //Funcion para cambiar un miembro de grupo
    cambiarMiembroGrupo(data, res){
        this.personaDAO.updatePersona(data, res);
    }

    //Funcion para obtener todas las personas registradas
    async obtenerPersonas(req,res){
        await this.DAO.allPersonas(req,res);
    }

    async obtenerPersonasGrupo(req,res){
        await this.DAO.allMiembrosGrupo(req,res);
    }

    //Funcion para obtener los asesores
    async obtenerAsesores(req,res){
        await this.personaDAO.getAsesores(req,res);
    }

    //Funcion para cambiar si es un posible monitor a verdadero
    async posibleMonitor(req,res){
        await this.DAO.cambiarEstadoMonitor(req,res);
    }

    async iniciarSesion(req, res){
        var fachadaLogIn = new Fachada(req.body.usuario, req.body.password, req.body.personas, req.body.movimientos);
        await fachadaLogIn.iniciarSesionFachada(req,res);
    }

    async enviarAporte(req,res){
        const cargarAporte = new CargarAporte();
        switch (req.body.tipo.value) {
            case "Ofrecimiento":
                cargarAporte.setStrategy(new Ofrecimiento());
                break;
            case "Agradecimiento": 
                cargarAporte.setStrategy(new Agradecimiento());
                break;
            case "Petitoria": 
                cargarAporte.setStrategy(new Petitoria());
                break;
            default:
              console.log('default');
        }
        cargarAporte.cargarDatos(req,res);
    }

}