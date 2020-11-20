const DataSource= require('./DataSource');
const GrupoDAO = require('./GrupoDAO');
const RamaDAO = require('./RamaDAO');
const ZonaDAO = require('./ZonaDAO');




module.exports= class DAO {
    dataSource= new DataSource();
    zonaDAO= new ZonaDAO();
    ramaDAO = new RamaDAO();
    grupoDAO = new GrupoDAO();
    connection;
    state;

    constructor(){
        this.connection = this.dataSource.Connect;
        this.state = this.connection.connection;
        this.state.setMaxListeners(0);
        this.state.once('open', () => console.log('------->>> Conexion con MongoDB exitosa <<<------'));
        this.state.on('error', console.error.bind(console, '------->>> Fallo en la conexión con MongoDB <<<------:'));
    }
    async crearZona(){
        this.zonaDAO.crearZona();
    }

    async crearRama(){
        this.ramaDAO.crearRama();

    }

    async crearGrupo(){
        this.grupoDAO.crearGrupo();

    }
    async agregarMiembro(){

    }


    async agregarAsesor(){

    }

    async asignarMiembro(){

    }
    async obtenerZonas(){

    }
    async obtenerRamas(){

    }

    async obtenerGrupos(){

    }

    async obtenerPersonas(){

    }

    async cambiarNombreGrupo(){

    }

    async trasladarMiembro(){

    }

}