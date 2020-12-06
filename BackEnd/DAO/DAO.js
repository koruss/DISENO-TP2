const DataSource= require('./DataSource');




module.exports= class DAO {
    dataSource = new DataSource();
    connection;
    state;

    openConnection() {
        //////////////////////////////
        ///   MONGODB CONNECTION
        //////////////////////////////
        this.connection = this.dataSource.Connect;
        this.state = this.connection.connection;
        this.state.setMaxListeners(0);
        this.state.once('open', () => console.log('------->>> Conexion con MongoDB exitosa <<<------'));
        this.state.on('error', console.error.bind(console, '------->>> Fallo en la conexión con MongoDB <<<------:'));
    }

    //Funcion que recibe un esquema para guardarlo en la base de datos
    async postData(schema, res){
        this.openConnection();
        schema.save( function(error,info) {
            if(error) { res.json({success:false, error:"Se ha producido un error guardando",error}) }
            else{
                res.json({success: true, info: info});
            }
        });
    }

    //Funcion que recibe un esquema para obtener los datos
    async getOneData(schema, param, req,res){
        this.openConnection();
        schema.findOne({usuario:req.body.usuario},(err,data)=>{
            if(err) return 
            res.send(data);
            res.end();
        })
    }

    //Funcion que recibe un esquema para obtener los datos
    async getData(schema, res){
        this.openConnection();
        schema.find({},(err,data)=>{
            if(err) return 
            res.send(data);
            res.end();
        })
    }

    //Funcion que inserta un monitor en un grupo y le establece un tipo
    async updateMonitorGrupo(data, schema, res){
        this.openConnection();
        schema.updateOne({_id:data.body.grupo.identificacion}, {$push:{ monitores: data.body.nombre.datosPersona}}, 
            function(error, info) {if (error) {res.json({success: false, error: 'No se pudo modificar el cliente',error});
        } else {res.json({success: true, info: info })}})
    }
    
    //Funcion que inserta un miembro en un grupo y le establece un tipo
    async updateMiembroGrupo(data, schema, res){
        this.openConnection();
        schema.updateOne({_id:data.body.grupo.identificacion}, {$push:{ miembros: data.body.nombre.datosPersona}}, 
            function(error, info) {if (error) {res.json({success: false, error: 'No se pudo modificar el cliente',error});
        } else {res.json({success: true, info: info })}})
    }

    //Funcion que inserta un jefe en un grupo y le establece un tipo
    async updateJefeGrupo(data, schema, ramaSchema, res){
        this.openConnection();
        schema.updateOne({_id:data.body.grupo.identificacion}, {$push:{ jefesGrupo: data.body.nombre.datosPersona}}, 
            function(error, info) {
                if (error) {
                    res.json({success: false, error: 'No se pudo modificar el cliente',error});
                } 
                else {
                    console.log(data.body.rama.identificacion)
                    ramaSchema.updateOne({_id:data.body.rama.identificacion}, {$push:{ jefesGrupo: data.body.nombre.datosPersona}},
                        function(error, info) {
                            if(error) {
                                res.json({success: false, error: 'No se pudo modificar el cliente',error});
                            }
                            else {
                                res.json({success: true, info: info });
                            }
                    })
                }
        })
    }


    //Funcion que le cambia el nombre a un grupo
    async cambiarNombreGrupo(req, schema, res){
        this.openConnection();
        schema.updateOne({_id:req.body.grupo.identificacion}, {$set:{ nombreGrupo: req.body.nombre}}, 
            function(error, info) {
            if (error) {
                res.json({
                    success: false,
                    error: 'No se pudo modificar el cliente',
                    error
                });
            } else {
                res.json({
                    success: true,
                    info: info
                })
            }
        })
    }

    //Funcion que traslado un miembro de un grupo
    async trasladarMiembro(data, schema, res){
        const schema2= schema;
        this.openConnection();
        
        schema.updateOne({_id:data.grupoTo.identificacion}, {$push:{ miembros: data.nombre.datosPersona}}, 
            function(error, info) {
            if (error) {
                res.json({
                    success1: false,
                    error1: 'No se pudo ingresar el miembro en el nuevo grupo',
                    error
                });
            } else {
                res.json({
                    success1: true,
                    info1: info
                })
            }
        })
        schema2.update({_id:data.grupoFrom.identificacion}, {$pull:{ "miembros":{"_id":data.nombre.datosPersona._id}} }).then((info,error)=>{
            if (error) {
                res.json({
                    success2: false,
                    error2: 'No se pudo borrar el miembro del grupo anterior',
                    error
                });
            } else {
                res.json({
                    success2: true,
                    info2: info
                })
            }
        })
    }

    //Funcion que modifica una rama para establecerle un grupo nuevo
    async modificarRama(req, schema){
        this.openConnection();
        schema.updateOne({_id:req.body.selectedRama.identificacion}, {$push:{ grupos: {nombre: req.body.nombreGrupo}}}, 
            function(error, info) { 
            }
        )
    }

    //Funcion que modifica una zona para agregarle una rama nueva
    async modificarZona(req, schema){
        this.openConnection();
        schema.updateOne({_id:req.body.selectedZona.identificacion}, {$push:{ ramas: {nombre: req.body.nombreRama}}}, 
            function(error, info) {
        })
    }

    //Funcion para crear una rama en una base de datos
    async crearRama(schema, schemaZona, req, res){
        this.openConnection();
        schema.save( function(error,info) {
            if(error) { res.json({success:false, error:"Se ha producido un error guardando",error}) }
            else{
                schemaZona.updateOne({_id:req.body.selectedZona.identificacion}, {$push:{ ramas: {nombre: req.body.nombreRama}}}, 
                    function(error, info) { } )
                res.json({success: true, info: info});
            }
        });
    }

    //Funcion para crear un grupo en la base de datos
    async crearGrupo(schema, schemaRama, req, res){
        this.openConnection();
        schema.save( function(error,info) {
            if(error) { res.json({success:false, error:"Se ha producido un error guardando",error}) }
            else{
                schemaRama.updateOne({_id:req.body.selectedRama.identificacion}, {$push:{ grupos: {nombre: req.body.nombreGrupo}}}, 
                    function(error, info) { } )
                res.json({success: true, info: info});
            }
        });
    }

    async updatePosibleMonitor(req,res,schema){
        console.log(req.body);
        this.openConnection();
        schema.updateOne({_id:req.body.persona.datosPersona[0]._id}, {$set:{ posibleMonitor: true}},
            function(error, info) {
                if (error) {
                    res.json({
                        success: false,
                        error: 'No se pudo modificar el cliente',
                        error
                    });
                } else {
                    res.json({
                        success: true,
                        info: info
                    })
                }
        })
    }

}
