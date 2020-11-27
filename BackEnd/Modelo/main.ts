
import CompositePersona from "./CompositePersona";
import LeafPersona from "./LeafPersona";

export module main_module{
    
        export function clientCode(component): void {
            // ...
        
            console.log(`RESULT: ${component.operation()}`);
        
            // ...
        }
        //------------- TODO
        //TODO: CAMBIAR EL TIPO A UN ENUM POR EJEMPLO "JEFE", "ZONA" ETC ETC
        export function prueba(): void{
            var persona1 = new LeafPersona(33,"Juan","activo",50095967,"josue2@gmail.com",'direccion_persona',"Jefe");
            var persona2 = new LeafPersona(34,"Anner","activo",777777,"anner@gmail.com",'direccion_persona',"Jefe");
        
            var zona = new CompositePersona(1,"Zona miedo","Activa",3223232,"Zona1@gmail.com",'direccion_persona',"Zona"); 
            var rama = new CompositePersona(1,"Rama miedo","Activa",3223232,"Rama1@gmail.com",'direccion_persona',"Rama")
            rama.anadirHijo(persona1);
            rama.anadirHijo(persona2);
            zona.anadirHijo(rama);
        
            console.log('-----------');
            console.log('Composicion');
            this.clientCode(zona);
            console.log('-----------');
        }
}


