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

    async cargarPersonas (req, res){
        // this.dao.cargarPersonas(req){
        //     console.log("personas: "+result+", prueba: "+result2)
        // })
        // let result=this.dao.cargarPersonas(req).then(data=>{
        //     console.log("Subject result: "+data)

        // })
        const result= await this.dao.cargarPersonas(req)
        console.log("subject: "+result.length);
    }

    async notificar (req, res){
        await this.dao.notificarNoticia(req, res)
    }

    crearNoticia(req, res){

        this.cargarPersonas(req, res)
    }
}