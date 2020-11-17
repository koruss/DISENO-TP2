const mongoose = require('mongoose');

module.exports= class DataSource {
    constructor(){

    }

    //Funcion para establecer la conexion con mongo
    get Connect() {
        const dbroute =
            'mongodb+srv://kenitoUwU:1234@tp-diseno.hwnkz.mongodb.net/PROGRA-1?authSource=admin&replicaSet=atlas-j7zojs-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true'
        mongoose.connect(dbroute, { useNewUrlParser: true, useUnifiedTopology: true });
        return mongoose;
    }
}