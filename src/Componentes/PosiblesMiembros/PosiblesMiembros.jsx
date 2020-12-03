import React, { Component } from 'react'
import axios from 'axios';
import Button from 'react-bootstrap/Button'
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import './PosiblesMiembros.css'
import '../../Componentes/General/Utils.css'
import Header from '../General/Header';

// Clase encargada de la transferencia de un miembro 
// de un grupo a otro
class PosiblesMiembros extends Component {
    
    state = {
        selectedNombre:[],
        selectedZona:[],
        selectedRama:[],
        selectedGrupo:[],
        nombres:[],
        zonasFrom:[],
        ramasFrom:[],
        grupos:[]
    }


    onChange = (e) => this.setState({[e.target.name]:e.target.value});

// Esta funcion se ejecuta automaticamente si la ventana se llama
//obtiene las zonas 
    componentWillMount() {
        var self = this;
        let arreglo = [];
        axios.post("/allZonas", {}).then(res => {
            const respuesta = res.data;
            respuesta.forEach(zonas=>{
                arreglo.push({
                    value:zonas.nombreZona,
                    label:zonas.nombreZona
                })
            })   
            this.setState({
                zonasFrom:arreglo
            })
        })

    }

//esta funcion se encarga de obtener todas las ramas y guardarlas en la 
//pagina
    obtenerRamas(){
        var self = this;
        let arreglo =[];
        axios.post("/allRama", {}).then(res => {
            const respuesta=res.data;
            const zonaNombre = this.state.selectedZona.value;
            respuesta.forEach(rama=>{
                if(rama.zona == zonaNombre){
                    arreglo.push({
                        value:rama.nombreRama,
                        label:rama.nombreRama
                    })
                }
            })   
                this.setState({
                ramasFrom:arreglo
            })
        })
    }

/*esta función se encarga de obtener todos los grupos y subirlos a la pantalla */
    obtenerGrupos(){
        var self = this;
        let arreglo =[];
        axios.post("/allGrupos", {}).then(res => {
            const respuesta=res.data;
            const ramaNombre = this.state.selectedRama.value;
            respuesta.forEach(grupo=>{
                if(grupo.nombreRama == ramaNombre){
                    arreglo.push({
                        value:grupo.nombreGrupo,
                        label:grupo.nombreGrupo,
                        identificacion:grupo._id,
                        miembros:grupo.miembros
                    })
                }
            })  
            this.setState({
                grupos:arreglo
            })
        })
    }

// esta función se encarga de obtener todos los registros de personas,
// y los guarda en la pantalla
    obtenerPersonas(selectedGrupo){
        var self = this;
        let arreglo= [];
        axios.post("/allPersona", {}).then(res => {
            const respuesta=res.data; // tiene todos lo miembros
            const miembrosGrupo = this.state.selectedGrupo.miembros //Miembros del grupo
            const monitoresGrupo = this.state.selectedGrupo.monitores
            const jefesGrupo = this.state.selectedGrupo.jefes
            const integrantesTotales = jefesGrupo.concat(monitoresGrupo,jefesGrupo);
            integrantesTotales.forEach(intgrante => {
                respuesta.forEach(persona => {
                if(integrantesTotales != undefined){
                    if(persona._id == intgrante._id){
                        arreglo.push({
                            value:persona.nombre,
                            label:persona.nombre,
                            datosPersona:{ _id:persona._id,
                                direccion: persona.direccion,
                                nombre:persona.nombre,
                                identificacion:persona.identificacion,
                                apellido1:persona.apellido1,
                                apellido2:persona.apellido2,
                                correo:persona.correo,
                                telefono:persona.telefono,
                                estado:persona.estado}
                        })
                    }
                }
                else{
                    alert("Este grupo no tiene personas")
                }
                })
            })
            this.setState({
                nombres:arreglo
            })
        })
    }


 /*esta funcion se ejecuta al ser precionado el botón
se encagada de recuperar los datos de los componentes 
y enviarlos a la API*/
    onClick = (e) => {
        if(this.state.selectedNombre.length != 0 && this.state.selectedZona.length != 0 &&
             this.state.selectedRama.length != 0 && this.state.selectedGrupo.length != 0){
        //     axios.post("/cambiarMiembroGrup",{
        //         nombre:this.state.selectedNombre,
        //         zona:this.state.selectedZona,
        //         rama:this.state.selectedRama,
        //         grupos:this.state.selectedGrupo
        //     }).then(res =>{
        //         if(!res.data.success1 && !res.data.success2){
        //             alert(res.data.error1, res.data.error2);
        //         }
        //         else{
        //             alert("Miembro trasladado correctamente")
        //             this.setState({
        //                 selectedNombre:[],
        //                 selectedZona:[],
        //                 selectedRama:[],
        //                 selectedGrupo:[]
        //             })
        //         }
        //     })
        }
         else{
             alert("Ingrese todos los datos")
         }
    }

/*Esta funcion lo que hace es asignar los datos del componente en su respectivo state */
    handleChangeZonas = selectedZona => {
        this.setState(
            { selectedZona }
        );
        this.limpiarRamas();
        this.obtenerRamas();
    }

/*Esta funcion lo que hace es asignar los datos del componente en su respectivo state */
    handleChangeRamas = selectedRama => {
        this.setState(
            {selectedRama}
        );
        this.limpiarGrupos();
        this.obtenerGrupos();
    }

/*Esta funcion lo que hace es asignar los datos del componente en su respectivo state */
    handleChangeGrupoFrom = selectedGrupo => {
        this.setState(
            { selectedGrupo },     
        );
        this.limpiarPersonas();
        this.obtenerPersonas(selectedGrupo);
    };

 /*Esta funcion lo que hace es asignar los datos del componente en su respectivo state */
    handleChangeNombre = selectedNombre => {
        this.setState(
            { selectedNombre },     
        );
    };


 /* esta funcion se encarga de limpiar los states de los componentes*/
    limpiarRamas(){
        this.state.selectedRamaFrom = []
    }

/* esta funcion se encarga de limpiar los states de los componentes*/
    limpiarGrupos(){
        this.state.selectedGrupo = []
    }

/* esta funcion se encarga de limpiar los states de los componentes*/
    limpiarPersonas(){
        this.state.selectedNombre = []
    }

/* Es la funcion encargada de levantar el codigo html */
    render() {
        return (
            <div>
                <Header></Header>
                <main className="container">
                    <form>
                        <h2>Seleccionar posibles monitores de grupo</h2>
                        <div id="center-section">
                            <div class="form-group" class="spacing-base">
                                <label for="zona">Seleccione la zona a la que pertenece la persona:</label>
                                <Select components={makeAnimated} name="zonaFrom" value={this.state.selectedZona} className="basic-multi-select"
                                    options={this.state.zonasFrom} classNamePrefix="select" onChange={this.handleChangeZonas} />
                            </div>
                            <div class="form-group" class="spacing-base">
                                <label for="rama">Seleccione la rama a la que pertenece la persona:</label>
                                <Select components={makeAnimated} name="ramaFrom" value={this.state.selectedRama} className="basic-multi-select"
                                    options={this.state.ramasFrom} classNamePrefix="select" onChange={this.handleChangeRamas} />
                            </div>
                            <div class="form-group" class="spacing-base">
                                <label for="grupo">Seleccione el grupo al que pertenece la persona:</label>
                                <Select components={makeAnimated} name="grupoFrom" value={this.state.selectedGrupo} className="basic-multi-select"
                                    options={this.state.grupos} classNamePrefix="select" onChange={this.handleChangeGrupoFrom} />
                            </div>
                            <div class="form-group" class="spacing-base">
                                <label for="grupoTo">Nombre del posible monitor:</label>
                                <Select components={makeAnimated} name="nombre" value={this.state.selectedNombre} className="basic-multi-select"
                                    options={this.state.nombres} classNamePrefix="select" onChange={this.handleChangeNombre} />
                            </div>
                            <button type="button" class="btn btn-dark" onClick={this.onClick}>Establecer</button>
                        </div>
                    </form>
                </main>
            </div>
        )
    };

}

export default PosiblesMiembros;