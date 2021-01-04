import {Verificador} from "./Verificador";
import {VerificadorReal} from "./VerificadorReal";
var PersonaDAO = require('../../DAO/PersonaDAO');

export class VerificadorProxy implements Verificador  {

    private VerfReal: VerificadorReal;
    private id: string;
    private password: string;
    private type: string;
    private personas;

    constructor(id:string, password:string, personas){
        this.id = id;
        this.password = password;
        this.personas = personas;
    }

    public iniciarSesion(): string {
        if(this.credencialesValidas(this.id, this.password)){
            if(this.VerfReal == null){
                this.VerfReal = new VerificadorReal(this.id,this.password,this.type);
            }
            this.VerfReal.iniciarSesion();
            return this.VerfReal.getTipo();
        }
        else{
            return null;
        }
    }

    public credencialesValidas(id:string, password:string){
        var auth = false;
        this.personas.forEach(persona=>{
            var id_persona = persona.datosPersona[0].identificacion;
            var contra_persona = persona.datosPersona[0].contrasena;
            if(id == id_persona && password == contra_persona){
                auth = true;
            }
        })
        return auth;
    }

}