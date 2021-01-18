import {AbstractPersona} from "./AbstractPersona";

export class LeafPersona extends AbstractPersona {
    
    public constructor(id, nombre, estado, telefono, correo, direccion, tipo){
        super(id, nombre, estado, telefono, correo, direccion, tipo);
    }

    public operation(): string {
        //return this.getNombre();
        return this.getNombre();
    }
}