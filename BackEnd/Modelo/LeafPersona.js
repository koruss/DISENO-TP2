
module.exports = class LeafPersona {
    id;
    parent;
    nombre;
    estado;
    telefono;
    correo;
    direccion;
    tipo;

    constructor(id,nombre,estado,telefono,correo,direccion,tipo) {
        this.id = id;
        this.nombre = nombre;
        this.estado = estado;
        this.telefono = telefono;
        this.correo = correo;
        this.direccion = direccion;
        this.tipo = tipo;
    }
    
    operation() {
        return this.nombre;
    }

    setParent(parent) {                                               
        this.parent = parent;
    }

  }