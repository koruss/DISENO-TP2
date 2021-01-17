const Observer =  require('./Observer');
const DAO = require('../DAO/DAO');

module.exports = class Subject{
    dao = new DAO();
    noticia;
    observers=[];

    constructor(){
    }

    suscribir(c){
        this.observers.push(c);
    }

    async cargarPersonas(req, res){
        const resultado = await this.dao.cargarPersonas(req, res)
        resultado.forEach(num=>{
            this.suscribir(num._id)
        })
        this.notificar(req, this.observers, res)
    }

    async notificar (req, observer, res){
        observer.forEach(element=>{
            this.dao.NotificarNoticia(req, element, res)
        })
    }

    crearNoticia(req, res){
        this.cargarPersonas(req, res)

    }
}