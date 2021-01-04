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
        this.VerfReal = null;
        console.log("Proxy iniciado");
    }

    public iniciarSesion(): void {
        if(this.credencialesValidas(this.id, this.password)){
            if(this.VerfReal == null){
                this.VerfReal = new VerificadorReal(this.id,this.password,this.type);
            }
            this.VerfReal.iniciarSesion();
        }
        else{
            console.log("No tiene acceso");
        }
    }

    public credencialesValidas(id:string, password:string){
        var auth = false;
        this.personas.forEach(persona=>{
            console.log(persona.datosPersona[0].identificacion);
            console.log(id);
            if(id == persona.datosPersona[0].identificacion){
                console.log("alo");
                auth = true;
            }
        })
        return auth;
    }


}