const Subject = require('./Subject')

module.exports = class Observer {
    subject;
    constructor(){
    }

    Update(){
        this.dao.notificar(this);
    }
}