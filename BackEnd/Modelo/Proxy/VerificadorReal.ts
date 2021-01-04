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

    public iniciarSesion(): void {
        //Hacer un if con el tipo o algo
        this.type = "MIEMBRO";
    }

    public getTipo(): string{
        return this.type;
    }

}