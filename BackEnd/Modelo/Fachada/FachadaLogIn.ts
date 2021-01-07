import {VerificadorProxy} from "../Proxy/VerificadorProxy";

export class FachadaLogIn {

    private VerfProxy: VerificadorProxy

    constructor(id:string, password:string, personas){
        this.VerfProxy = new VerificadorProxy(id, password, personas);
    }

    public iniciarSesionFachada(): string {
        //aqui van mas metodos mas adelante
        var tipo = this.VerfProxy.iniciarSesion();
        return tipo;
    }

}