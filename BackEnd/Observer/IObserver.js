const Subject = require('../Observer/Subject')

module.exports = class IObserver{
    constructor(){
        this.noticia="";
        this.isPendiente=true;
    }

    Update(){
        this.notificar(this);
    }
}