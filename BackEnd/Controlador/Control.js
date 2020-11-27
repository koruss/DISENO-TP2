const DAO = require('../DAO/DAO.js')
var GestorMiembro = require('./GestorMiembro');
const GestorEstructura = require('./GestorEstructura');
///<reference path='../Modelo/main.ts'/>

module.exports = class Control{
    dao = new DAO();
    gestorMiembro = new GestorMiembro();
    gestorEstructura = new GestorEstructura();
    

    //Función que devuelve todos los asesores autorizados para acceder a la aplicación
    async allAsesores(req,res){
        await this.gestorMiembro.obtenerAsesores(req,res);
    }

    //Función responsable de dar acceso a los asesores a la aplicación
    async logIn(req,res){
        main_module.prueba();
        var pName = req.body.pName;
        var pPassword = req.body.pPassword;
        req.session.loggedIn = true;
        req.session.user=pName;
        req.session.password=pPassword; 
        return res.json({ success: true });  
    }
    
    // Función que da cierre a la sesión en la aplicación
    cerrarSesion(req,res){
        req.session.destroy((err) => {
            if (err) return console.log("Error al cerrar sesion");
            else  return res.json({ success: true });
        })
    }

    // Metódo constructor 
    constructor(){
    }

    // Función que conecta con el gestor de la estructura para
    // coordinar la creación de una rama
    async crearRama(req, res){
        await this.gestorEstructura.crearRama(req,res)
    } 

    // Función que conecta con el gestor de la estructura para
    // coordinar la creación de un grupo nuevo
    async guardarGrupo(req,res){
        await this.gestorEstructura.crearGrupo(req,res);
    }

    // Función encargada de enviar los datos de un miembro al gestor de 
    // miembros, esto para ser creado posteriormente
    async guardarMiembro(data, res){
        await this.gestorMiembro.agregarMiembro(data, res);
    }

    // Función encargada de enviar los datos de un asesor al gestor de 
    // miembros, esto para ser creado posteriormente
    async guardarAsesor(data, res){
        let response = await this.gestorMiembro.agregarAsesor(data, res);
    }

    // Función encargada de enviar los datos de un miembro al gestor de 
    // estructura, esto para posteormente ser asignado a uno de los grupos
    // creados en la aplicación.
    async asignarMiembro(req, res){
        await this.gestorEstructura.asignarMiembro(req, res);
    }

    // Funcion encarga de conectar con el gestor de estructura, pasandole 
    // los datos requeridos para la creación de una zona en la organización
    // de la aplicación
    async guardarZona(req, res){
        await this.gestorEstructura.guardarZona(req, res)
    }

    // Función que devuelve todas las zonas obtenidas
    // desde la base de datos al FrontEnd para poder mostrarlas al usuario
    async allZonas(req, res){
        await this.gestorEstructura.obtenerZonas(req, res);
    }

    // Función que devuelve todas las ramas obtenidas
    // desde la base de datos al FrontEnd para poder mostrarlas al usuario
    async allRama(req,res){
        await this.gestorEstructura.obtenerRamas(req, res)
    }

    // Función que devuelve todas los grupos obtenidas
    // desde la base de datos al FrontEnd para poder mostrarlas al usuario
    async allGrupos(req,res){
        await this.gestorEstructura.obtenerGrupos(req, res)
    }

    // Función que devuelve todas las personas obtenidas
    // desde la base de datos al FrontEnd para poder mostrarlas al usuario
    async allPersona(req,res){
        await this.gestorMiembro.obtenerPersonas(req, res)
    }

    // Función que conecta con el gestor de la estructura, pasandole los 
    // datos necesarios para modificar el nombre de un grupo
    async cambiarNombreGrupo(req,res){
        await this.gestorEstructura.cambiarNombreGrupo(req, res)
    }

    // Función que conecta con el gestor de la estructura, pasandole los 
    // datos necesarios para trasladar a un miembro de un grupo a otro
    cambiarMiembroGrupo(data, res){
        this.gestorEstructura.trasladarMiembro(data, res);
    }

}


