/**
 * Coordinación
 * Clase Coordinación que conecta con los gestores
 * 
 */
module.exports = class Coordinacion {
    cedulaJuridica;
    nombre;
    direccionWeb;
    direccion;
    telefono;
    logo;
    pais;
    zonas;
    asesor;

    constructor(cedulaJuridica, nombre, direccionWeb, direccion, 
        telefono,logo,pais,zonas,asesor){
            this.cedulaJuridica=cedulaJuridica;
            this.nombre=nombre;
            this.direccionWeb=direccionWeb;
            this.direccion=direccion;
            this.telefono=telefono;
            this.logo=logo;
            this.pais=pais;
            this.zonas=zonas;
            this.asesor=asesor;
        }

    setCedulaJuridica(cedulaJuridica){
        this.cedulaJuridica=cedulaJuridica;
    }

    getCedulaJuridica(){
        return this.cedulaJuridica
    }

    setNombre(nombre){
        this.nombre=nombre;
    }

    getNombre(){
        return this.nombre
    }

    setDireccionWeb(direccionWeb){
        this.direccionWeb=direccionWeb;
    }

    getDireccionWeb(){
        return this.direccionWeb
    }

    setDireccion(direccion){
        this.direccion=direccion;
    }

    getDireccion(){
        return this.direccion
    }

    setTelefono(telefono){
        this.telefono=telefono;
    }

    getTelefono(){
        return this.telefono
    }

    setLogo(logo){
        this.logo=logo;
    }

    getLogo(){
        return this.logo
    }

    setPais(pais){
        this.pais=pais;
    }

    getPais(){
        return this.pais
    }

    setZonas(zonas){
        this.zonas=zonas;
    }

    getZonas(){
        return this.zonas
    }

    setAsesor(asesor){
        this.asesor=asesor;
    }

    getAsesor(){
        return this.asesor
    }

}



