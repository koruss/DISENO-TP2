const DataSource = require('./DataSource');
const CompositeSchema = require('../Schemas/CompositeSchema.js');
const PersonaSchema = require("../Schemas/PersonSchema.js");
const MovimientoSchema = require("../Schemas/MovimientoSchema.js");




module.exports = class DAO {
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
    async postData(schema, res) {
        this.openConnection();
        schema.save(function (error, info) {
            if (error) { res.json({ success: false, error: "Se ha producido un error guardando", error }) }
            else {
                res.json({ success: true, info: info });
            }
        });
    }

    //Funcion que recibe un esquema para obtener los datos
    async getOneData(schema, param, req, res) {
        this.openConnection();
        schema.findOne({ usuario: req.body.usuario }, (err, data) => {
            if (err) return
            res.send(data);
            res.end();
        })
    }

    //Funcion que recibe un esquema para obtener los datos
    async getData(schema, res) {
        this.openConnection();
        schema.find({}, (err, data) => {
            if (err) return
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
    async updateMiembroEnGrupo(req, res){
        console.log(req.body)
        if(req.body.rama==null){
            this.actualizarJefes(req.body.zona, req.body.rama, req.body._idPerson, res)

        }else if(req.body.grupo==null){
            //Se asigna jefe a la rama
            this.actualizarJefes(req.body.rama, req.body.zona, req.body._idPerson, res)

        }else{
            if(req.body.categoriaPersona=="Monitor"){
                //Se asigna como monitor grupo
                CompositeSchema.updateOne({_id:req.body.grupo},{$addToSet:{monitores:req.body._idPerson}},function(err,success){
                    if(err) {
                        res.json({success: false, error: 'No se pudo actualizar el dato',error});
                    }
                    else {
                        CompositeSchema.updateOne({_id:req.body.rama},{$addToSet:{miembros:req.body._idPerson}},function(err,success){
                            if(err) {
                                res.json({success: false, error: 'No se pudo actualizar el dato',error});
                            }
                            else {
                                PersonaSchema.updateOne({_id:req.body._idPerson},{tipo: 2},function(err,success){
                                    if(err)return handleError(err);
                                    else{
                                        return res.json({success:true})
                                    }
                                })
                            }
                        })
                        // res.json({success: true, info: info });
                    }
                })
            }else{
                //Se asigna jefe en grupo
                this.actualizarJefes(req.body.grupo, req.body.rama, req.body._idPerson, res)
            }
        }
    }

    async actualizarJefes(dataLugarJefe, dataLugarMiembro, _idPerson, res){
        CompositeSchema.updateOne({_id:dataLugarJefe},{$addToSet:{jefes:_idPerson}},function(err,success){
            if(err) {
                res.json({success: false, error: 'No se pudo actualizar el dato',error});
            }
            else {
                if(dataLugarMiembro!=null){
                    CompositeSchema.updateOne({_id:dataLugarMiembro},{$addToSet:{miembros:_idPerson}},function(err,success){
                        if(err) {
                            res.json({success: false, error: 'No se pudo actualizar el dato',error});
                        }
                        else {
                            PersonaSchema.updateOne({_id:_idPerson},{tipo: 2},function(err,success){
                                if(err)return handleError(err);
                                else{
                                    return res.json({success:true})
                                }
                            })
                        }
                    })
                }else{
                    PersonaSchema.updateOne({_id:_idPerson},{tipo: 2},function(err,success){
                        if(err)return handleError(err);
                        else{
                            return res.json({success:true})
                        }
                    })
                }
                // this.actualizarMiembros(dataLugarMiembro, _idPerson, res)
                
            }
        })
    }


    //*********************************    NO BORRAR    *************************************** */
    // async actualizarMiembros(dataLugar, _idPerson, res){
    //     CompositeSchema.updateOne({_id:dataLugar},{$addToSet:{miembros:_idPerson}},function(err,success){
    //         if(err) {
    //             res.json({success: false, error: 'No se pudo actualizar el dato',error});
    //         }
    //         else {
    //             res.json({ success: true })
    //         }
    //     })
    // }

    // async actualizarTipoPersonaMiembro(req,res){
    //     PersonaSchema.updateOne({identificacion:req.body.identificacion},{tipo: 1},function(err,success){
    //         if(err)return handleError(err);
    //         else{
    //             return res.json({success:true})
    //         }
    //     })
    // }

    // async actualizarTipoPersonaMonitorJefe(_idPerson,res){
    //     PersonaSchema.updateOne({identificacion:_idPerson},{tipo: 2},function(err,success){
    //         if(err)return handleError(err);
    //         else{
    //             return res.json({success:true})
    //         }
    //     })
    // }

    // async actualizarTipoPersonaAsesor(req,res){
    //     PersonaSchema.updateOne({identificacion:req.body.identificacion},{tipo:3},function(err,success){
    //         if(err)return handleError(err);
    //         else{
    //             return res.json({success:true})
    //         }
    //     })
    // }
    //*********************************    NO BORRAR    *************************************** */

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


    //Funcion que modifica una rama para establecerle un grupo nuevo
    async modificarRama(req, schema) {
        this.openConnection();
        schema.updateOne({ _id: req.body.selectedRama.identificacion }, { $push: { grupos: { nombre: req.body.nombreGrupo } } },
            function (error, info) {
            }
        )
    }

    //Funcion que modifica una zona para agregarle una rama nueva
    async modificarZona(req, schema) {
        this.openConnection();
        schema.updateOne({ _id: req.body.selectedZona.identificacion }, { $push: { ramas: { nombre: req.body.nombreRama } } },
            function (error, info) {
            })
    }

    async crearGrupo(req, res) {
        console.log(req.body)
        this.openConnection();
        const schema = new CompositeSchema();
        schema.nombre = req.body.nombreGrupo;
        schema.tipo=3;
        schema.save();
        CompositeSchema.update({ _id: req.body.selectedRama._id}, { $addToSet: { children: schema._id } }, function (err, result) {
            if (err) {
                console.log(err);
                res.json({ success: false, error: "Se ha producido un error guardando", error })
            }
            else {
                res.json({ success: true })
            }
        })
    }

    async crearRama(req, res) {
        this.openConnection();
        const schema = new CompositeSchema();
        schema.nombre = req.body.nombreRama;
        schema.tipo=2;
        schema.save();
        CompositeSchema.update({ _id: req.body.selectedZona.identificacion }, { $addToSet: { children: schema._id } }, function (err, result) {
            if (err) {
                console.log(err);
                res.json({ success: false, error: "Se ha producido un error guardando", error })
            }
            else {
                res.json({ success: true })
            }
        })
    }

    async crearZona(req, res) {
        this.openConnection();
        const schema = new CompositeSchema();
        schema.nombre = req.body.nombreZona;
        schema.tipo=1
        schema.save(function (err, success) {
            if (err) {
                console.log(err);
                res.json({ success: false, error: "Se ha producido un error guardando", error })
            }
            else {
                res.json({ success: true })
            }
        })
    }

    async allZonas(req,res){
        this.openConnection();
        CompositeSchema.find({tipo:1}, function(err,data){
            if(err){
                console.log(err)
                res.json({success:false, error:" Algo salio del orto"})
            }
            else{
                res.send(data);
                res.end();
            }
        })
    }

    async allRamas(req,res){
        this.openConnection();
        CompositeSchema.find({tipo:2}, function(err,data){
            if(err){
                console.log(err)
                res.json({success:false, error:" Algo salio del orto"})
            }
            else{
                res.send(data);
                res.end();
            }
        })
    }
    

    async allRamasZona(req,res){
        this.openConnection();
        CompositeSchema.findOne({_id: req.body._id}).populate("children").exec(function(err,data){
            if(err){
                // console.log(err)
                res.json({success:false, error:" Algo salio del orto"})
            }
            else{
                res.send(data.children);
                res.end();
            }
        })
    }


    async allGrupos(req,res){
        this.openConnection();
        CompositeSchema.find({tipo:3}, function(err,data){
            if(err){
                console.log(err)
                res.json({success:false, error:" Algo salio del orto"})
            }
            else{
                res.send(data);
                res.end();
            }
        })
    }

    async allGruposRama(req,res){
        this.openConnection();
        CompositeSchema.findOne({_id: req.body._id}).populate("children").exec(function(err,data){
            if(err){
                console.log(err)
                res.json({success:false, error:" Algo salio del orto"})
            }
            else{
                res.send(data.children);
                res.end();
            }
        })
    }

    async allPersonas(req,res){
        this.openConnection();
        PersonaSchema.find({}, function(err,data){
            if(err){
                res.json({success:false, error:" Algo salio del orto"})
            }
            else{
                //console.log(data)
                res.send(data);
                res.end();
            }
        })
    }

    async allMiembrosGrupo(req,res){
        this.openConnection();
        CompositeSchema.findOne({_id:req.body._id}).populate("miembros").exec(function(err,data){
            if(err){
                console.log(err)
                res.json({success:false, error:" Algo salio del orto"})
            }
            else{
                res.send(data.miembros);
                res.end();
            }
        })
    }

    async cambiarNombreGrupo(req,res){
        this.openConnection();
        CompositeSchema.updateOne({_id:req.body.grupo},{nombre:req.body.nombre},(error,info)=>{
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

    async postPersona(req,res){
        this.openConnection()
        PersonaSchema.findOne({identificacion:req.body.identificacion}, function(err,data){
            if(err){
                res.json({success:false, error:" Algo salio del orto"})
            }
            else if(data == null){
                const personaSchema = new PersonaSchema();
                const direccion = {
                    pais: req.body.pais.value,
                    provincia: req.body.provincia.value,
                    canton: req.body.provincia.value,
                    distrito: req.body.distrito.value
                }
                personaSchema.idMovimiento= req.body.movimiento;
                personaSchema.nombre=req.body.nombre;
                personaSchema.contrasena=req.body.contrasena;
                personaSchema.identificacion=req.body.identificacion;
                personaSchema.apellido1=req.body.apellido1;
                personaSchema.apellido2=req.body.apellido2;
                personaSchema.posibleMonitor=false;
                personaSchema.telefono=req.body.celular;
                personaSchema.correo=req.body.correo;
                personaSchema.direccion=direccion;
                personaSchema.tipo=-1;
                personaSchema.save(function(){
                    res.send({success:true})
                    res.end()
                });
            }
            else{
                res.json({success:false, error:" Ya esa identificacion esta registrada!"})
            }
        })
            
    }

    async obtenerMovimientos(req,res){
        this.openConnection()
        MovimientoSchema.find({}, function(err,data){
            if(err){
                res.json({success:false, error:" Algo salio del orto"})
            }
            else{
                res.send(data);
                res.end();
            }
        })
    }

    async cambiarEstadoMonitor(req,res){
        console.log(req.body.identificacion)
        PersonaSchema.updateOne({identificacion:req.body.identificacion},{posibleMonitor:true},function(err,success){
            if(err)return handleError(err);
            else{
                return res.json({success:true})
            }
        })
    }


    async cambiarMiembroGrupo(req,res){// hay que ver como 
        console.log(req.body)
        CompositeSchema.updateOne({_id:req.body.grupoTo},{$addToSet:{miembros:req.body._idPerson}},function(err,success){
            if(err)return handleError(err);
            else{
                CompositeSchema.updateOne({_id:req.body.grupoFrom},{$pull:{miembros:req.body._idPerson}},function(err,success){
                    if(err){
                        console.log(err);
                        return res.json({
                            success: false,
                            error: err
                        })
                    }
                    else{
                        res.json({success:true})
                    }
        
                })
            }
        })
    }

    async subirAgradecimiento(req,res){
        this.openConnection();
        MovimientoSchema.updateOne({_id:req.body.id_movimiento}, {$addToSet:{'aportes.agradecimiento':
            {detalle:req.body.detalle, nombre:req.body.nombre_persona, fecha:req.body.fecha}}}, 
            function(error, info) {if (error) {res.json({success: false, error: 'No se pudo crear el aporte',error});
        } else {res.json({success: true, info: info })}})
    }

    async subirPetitoria(req,res){
        this.openConnection();
        MovimientoSchema.updateOne({_id:req.body.id_movimiento}, {$addToSet:{'aportes.petitoria':
            {detalle:req.body.detalle, nombre:req.body.nombre_persona, fecha:req.body.fecha}}}, 
            function(error, info) {if (error) {res.json({success: false, error: 'No se pudo crear el aporte',error});
        } else {res.json({success: true, info: info })}})
    }

    async subirOfrecimiento(req,res){
        this.openConnection();
        MovimientoSchema.updateOne({_id:req.body.id_movimiento}, {$addToSet:{'aportes.ofrecimiento':
            {detalle:req.body.detalle, nombre:req.body.nombre_persona, fecha:req.body.fecha}}}, 
            function(error, info) {if (error) {res.json({success: false, error: 'No se pudo crear el aporte',error});
        } else {res.json({success: true, info: info })}})
    }

    async obtenerAportes(req,res){
        this.openConnection()
        MovimientoSchema.findOne({_id:req.body.id_movimiento}).populate("aportes").exec(function(err,data){
            if(err){
                res.json({success:false, error:" Algo salio del orto"})
            }
            else{
                res.send(data.aportes);
                res.end();
            }
        })
    }

    async composicionGrupo(req,res){
        this.openConnection();
        console.log(req.body)
        if(req.body.tipoUsuario=="JEFE"){
            CompositeSchema.find({tipo:3,monitores:req.body.idUsuario}).populate("miembros").populate("jefes").populate("monitores").exec(function(err,data){//query de monitores de grupo
                if(err){
                    return res.json({success:false,error:err})
                }
                res.send(data);
                res.end();
                
            })
        }
        if(req.body.tipoUsuario=="ASESOR"){
            CompositeSchema.find({tipo:3}).populate("miembros").populate("jefes").populate("monitores").exec(function(err,data){//query de monitores de grupo
                if(err){
                    return res.json({success:false,error:err})
                }
                res.send(data);
                res.end();
                
            })
        }
        if(req.body.tipoUsuario=="MIEMBRO"){
            CompositeSchema.find({tipo:3,miembros:req.body.idUsuario}).populate("miembros").populate("jefes").populate("monitores").exec(function(err,data){//query de monitores de grupo
                if(err){
                    return res.json({success:false,error:err})
                }
                res.send(data);
                res.end();
                
            })

        }
        
    }
}
