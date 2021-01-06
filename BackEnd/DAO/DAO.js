const DataSource = require('./DataSource');
const CompositeSchema = require('../Schemas/CompositeSchema.js');
const PersonaSchema = require("../Schemas/PersonSchema.js");




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


    //Funcion que inserta un miembro en un grupo y le establece un tipo
    async updateMiembroEnGrupo(data, schema, personSchema, res) {
        this.openConnection();
        console.log(data.body.nombre.datosPersona[0]._id)
        personSchema.updateOne({ _id: data.body.nombre.datosPersona[0]._id }, { $set: { estado: true } },
            function (error, info) { })
        if (data.body.monitor.value == "Monitor") {
            schema.updateOne({ _id: data.body.grupo.identificacion }, { $push: { monitores: data.body.nombre.datosPersona } },
                function (error, info) {
                    if (error) {
                        res.json({ success: false, error: 'No se pudo modificar el cliente', error });
                    } else { res.json({ success: true, info: info }) }
                })
        } else if (data.body.monitor.value == "Miembro") {
            schema.updateOne({ _id: data.body.grupo.identificacion }, { $push: { miembros: data.body.nombre.datosPersona } },
                function (error, info) {
                    if (error) {
                        res.json({ success: false, error: 'No se pudo modificar el cliente', error });
                    } else { res.json({ success: true, info: info }) }
                })
        } else {
            schema.updateOne({ _id: data.body.grupo.identificacion }, { $push: { jefesGrupo: data.body.nombre.datosPersona } },
                function (error, info) {
                    if (error) {
                        res.json({ success: false, error: 'No se pudo modificar el cliente', error });
                    } else { res.json({ success: true, info: info }) }
                })
        }
    }

    //Funcion que traslado un miembro de un grupo
    async trasladarMiembro(data, schema, res) {
        const schema2 = schema;
        this.openConnection();

        schema.updateOne({ _id: data.grupoTo.identificacion }, { $push: { miembros: data.nombre.datosPersona } },
            function (error, info) {
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
        schema2.update({ _id: data.grupoFrom.identificacion }, { $pull: { "miembros": { "_id": data.nombre.datosPersona._id } } }).then((info, error) => {
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
        CompositeSchema.update({ _id: req.body.selectedRama.identificacion }, { $addToSet: { children: schema._id } }, function (err, result) {
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
        console.log(req.body)
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
        // CompositeSchema.update({_id:req.body.selectedZona.identificacion},{$addToSet:{children:schema._id}},function(err, result){
        //     if(err){
        //         console.log(err);
        //         res.json({success:false, error:"Se ha producido un error guardando",error})
        //     }
        //     else{
        //         res.json({success:true})
        //     }
        // })
    }

    async allZonas(req,res){
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
        PersonaSchema.find({}, function(err,data){
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

    async allMiembrosGrupo(req,res){
        PersonaSchema.find({_id:req.body._id}, function(err,data){
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

    async cambiarNombreGrupo(req,res){
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

    async cambiarMiembroGrupo(req,res){// hay que ver como 
        CompositeSchema.update({_id:req.body.selectedGrupoFrom},{$pull:{miembros:req.body._id}},function(err,success){
            if(err){
                console.log(err);
            }
            else{
                CompositeSchema.update({_id:req.body.selectedGrupoTo},{$addToSet:{miembros:req.body._id}},(err,success2)=>{
                    if(err){
                        console.log(err);
                    }
                    else{
                        res.json({success:true})
                    }
                })
            }

        })
        

    }
}
