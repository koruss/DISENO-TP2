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
        console.log(this.type);
        switch (this.type) {
        case '1':
            this.type = "MIEMBRO";
            break;
        case '2':
            this.type = "JEFE";
            break;
        case '3':
            this.type = "ASESOR";
            break;
        default:
            this.type = null;
            break;
        }
        console.log(this.type);
    }

    public getTipo(): string{
        return this.type;
    }

}