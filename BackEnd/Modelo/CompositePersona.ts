
import {AbstractPersona} from "./AbstractPersona";

export class CompositePersona extends AbstractPersona{
    protected hijos: AbstractPersona[] = [];
    
    constructor(id, nombre, estado, telefono, correo, direccion, tipo) {
        super(id, nombre, estado, telefono, correo, direccion, tipo);
    }
    //anade un hijo al composite
    public anadirHijo(hijo: AbstractPersona): void{
        this.hijos.push(hijo);        //Agregamos un hijo a este composite
        hijo.setParent(this);         //Al hijo de este composite le decimos que este es el padre
    }

    //Removemos un hijo del composite
    public removerHijo(hijo: AbstractPersona): void{
        const componentIndex = this.hijos.indexOf(hijo);
        this.hijos.splice(componentIndex, 1);

        hijo.setParent(null);
    }

    //Retorna si es un composite
    public isComposite(): boolean {
        return true;
    }

    //Operacion para recorrer el composite por completo (se utiliza como ejemplo para ver la forma recursiva de recorrido)
    operation() {
        const results = [];
        for (const hijo of this.hijos) {
            results.push(hijo.operation());
        }

        return `Branch(${results.join('+')})`;
    }

  }
