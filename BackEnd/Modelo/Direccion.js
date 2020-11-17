//Clase direccion 

module.exports = class Direccion { 
    constructor(provincia, canton, distrito, senas, zona) { 
      this.provincia = provincia;                           //Provincia de la direccion
      this.canton = canton;                                 //Canton de la direccion
      this.distrito = distrito;                             //Distrito de la  direccion
      this.senas = senas;                                   //Senas extra de la direccion
      this.zona = zona;                                     //Zona de la direccion
    }   
  } 
