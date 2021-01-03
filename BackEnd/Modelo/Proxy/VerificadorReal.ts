import {Verificador} from "./Verificador";

export class VerificadorReal implements Verificador  {

    private id: string;
    private password: string;
    private type: string;


    constructor(id:string, password:string, type:string){
        this.id = id;
        this.password = password;
        this.type = type;
    }

    public iniciarSecion(id:string, password:string): void {
        console.log("Aqui llamar al facade correspondiente");
    }


}