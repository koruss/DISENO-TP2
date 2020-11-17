
module.exports = class CompositePersona{
    id;
    parent;
    nombre;
    estado;
    telefono;
    correo;
    direccion;
    tipo;
    hijos = [];

    constructor(id,nombre,estado,telefono,correo,direccion,tipo) {
        this.id = id;
        this.nombre = nombre;
        this.estado = estado;
        this.telefono = telefono;
        this.correo = correo;
        this.direccion = direccion;
        this.tipo = tipo;
    }
    
    //Establece el padre composite
    setParent(parent) {                                               
        this.parent = parent;
    }

    //Retorna el padre del composite
    getParent() {                                                     
        return this.parent;
    }

    //anade un hijo al composite
    anadirHijo(componente){
        this.hijos.push(componente);        //Agregamos un hijo a este composite
        componente.setParent(this);         //Al hijo de este composite le decimos que este es el padre
    }

    //Removemos un hijo del composite
    removerHijo(componente){
        componenteIndex = this.hijos.indexOf(componente);
        this.hijos.splice(componenteIndex,1);
        componente.setParent(null);
    }

    //Retorna si es un composite
    isComposite() {
        return true;
    }

    //Operacion para recorrer el composite por completo (se utiliza como ejemplo para ver la forma recursiva de recorrido)
    operation() {
        const results = [];
        for (const hijo of this.hijos) {
            results.push(hijo.operation());
        }

        return this.nombre+"("+results.join('+')+")";
    }

  }