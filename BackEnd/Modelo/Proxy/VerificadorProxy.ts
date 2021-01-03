import {Verificador} from "./Verificador";
import {VerificadorReal} from "./VerificadorReal";

export class VerificadorProxy implements Verificador  {

    private VerfReal: VerificadorReal;
    private id: string;
    private password: string;
    private type: string;


    constructor(id:string, password:string, type:string){
        this.id = id;
        this.password = password;
        this.type = type;
        this.VerfReal = null;
        console.log("Proxy iniciado");
    }

    public iniciarSecion(id:string, password:string): void {
        if(!this.credencialesValidas(id, password)){
            if(this.VerfReal == null){
                this.VerfReal = new VerificadorReal(this.id,this.password,this.type);
            }
            this.VerfReal.iniciarSecion(id, password);
        }
        else{
            console.log("No tiene acceso");
        }
    }

    public credencialesValidas(id:string, password:string){
        if(id == "Anner" && password == "Josue"){
            return true;
        }
        else{
            return false;
        }
    }


}