

abstract class AbstractPersona {
    private id: number;
    protected parent: AbstractPersona;
    private nombre: string;
    private estado: string;
    private telefono: number;
    private correo: string;
    private direccion: string;
    private tipo: string;
  
    constructor(id, nombre, estado, telefono, correo, direccion, tipo) {
      this.id = id;
      this.nombre = nombre;
      this.estado = estado;
      this.telefono = telefono;
      this.correo = correo;
      this.direccion = direccion;
      this.tipo = tipo;
    }
    
    //Establece el padre composite
   public setParent(parent: AbstractPersona) {                                               
        this.parent = parent;
    }


    //Retorna el padre del composite
    public  getParent(): AbstractPersona {                                                     
        return this.parent;
    }


    //Funcion para anadir un hijo a algun composite
    public anadirHijo( hijo: AbstractPersona): void{ }

    //Funcion para remover un hijo del composite
    public removerHijo( hijo: AbstractPersona){ }

    //Funcion para saber si es un composite
    public isComposite(): boolean {
        return false;
    }


    //Funcion que hace un recorrido por todo el composite
    public abstract operation(): string;

    setEstado() { }


    getEstado() { }

  }

export = AbstractPersona;

  