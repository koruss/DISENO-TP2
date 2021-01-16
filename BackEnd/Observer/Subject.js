const IObserver =  require('./IObserver');
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
            // console.log("id: "+num._id)
            this.suscribir(num._id)
        })
        // console.log("subject: "+resultado)

        // console.log("observer subject cargarPersonas: "+this.observers)
        this.notificar(req, this.observers,res)
    }

    async notificar (req, observer, res){
        // console.log("***************************************************************")
        // console.log("observers Subject: "+observer)
        observer.forEach(element=>{
            // console.log("------------------------------------------------------------")
            // console.log(element)
            this.dao.NotificarNoticia(req, element, res)
        })
    }

    crearNoticia(req, res){
        this.cargarPersonas(req, res)

    }
}