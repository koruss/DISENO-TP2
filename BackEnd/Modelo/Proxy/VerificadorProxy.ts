import {Verificador} from "./Verificador";
import {VerificadorReal} from "./VerificadorReal";

export class VerificadorProxy implements Verificador  {

    private VerfReal: VerificadorReal;
    private id: string;
    private password: string;
    private type: string;
    private id_movimiento;
    private nombre_movimiento;
    private movimientos;
    private personas;

    constructor(id:string, password:string, personas, movimientos){
        this.id = id;
        this.password = password;
        this.personas = personas;
        this.movimientos = movimientos;
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
                this.type = persona.datosPersona[0].tipo;
                auth = true;
                var movimiento = this.movimientos.find(element => element._id = persona.datosPersona[0].idMovimiento);
                this.id_movimiento = movimiento._id;
                this.nombre_movimiento = movimiento.nombre;
            }
        })
        return auth;
    }

    public getIdMovimiento(): string{
        return this.id_movimiento;
    }

    public getNombreMovimiento(): string{
        return this.nombre_movimiento;
    }

}