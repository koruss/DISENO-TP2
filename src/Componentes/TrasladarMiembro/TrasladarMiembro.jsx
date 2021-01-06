import React, { Component } from 'react'
import axios from 'axios';
import Button from 'react-bootstrap/Button'
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import './TrasladarMiembro.css'
import '../../Componentes/General/Utils.css'
import Header from '../General/Header';

// Clase encargada de la transferencia de un miembro 
// de un grupo a otro
class TrasladarMiembro extends Component {
    
    state = {
        selectedNombre:[],
        selectedZona:[],
        selectedRama:[],
        selectedGrupoFrom:[],
        selectedGrupoTo:[],
        nombres:[],
        zonasFrom:[],
        ramasFrom:[],
        grupoFrom:[],
        grupoTo:[]
    }


    onChange = (e) => this.setState({[e.target.name]:e.target.value});


    /*Esta funcion lo que hace es asignar los datos del componente en su respectivo state */
    handleChangeZonas = selectedZona => {
        this.setState(
            { selectedZona }
        );
        this.limpiarRamas();
        this.obtenerRamas(selectedZona);
    }

/*Esta funcion lo que hace es asignar los datos del componente en su respectivo state */
    handleChangeRamas = selectedRama => {
        this.setState(
            {selectedRama}
        );
        this.limpiarGrupos();
        this.obtenerGruposFrom(selectedRama);
        this.obtenerGruposTo(selectedRama);
    }

/*Esta funcion lo que hace es asignar los datos del componente en su respectivo state */
    handleChangeGrupoFrom = selectedGrupoFrom => {
        this.setState(
            { selectedGrupoFrom },     
        );
        this.limpiarPersonas();
        this.obtenerPersonas(selectedGrupoFrom);
    };

 /*Esta funcion lo que hace es asignar los datos del componente en su respectivo state */
    handleChangeNombre = selectedNombre => {
        this.setState(
            { selectedNombre },     
        );
    };

/*Esta funcion lo que hace es asignar los datos del componente en su respectivo state */
/* esta funcion se encarga de limpiar los states de los componentes*/
    handleChangeGrupoTo = selectedGrupoTo => {
        this.setState(
            { selectedGrupoTo },     
        );
        this.limpiarPersonas();
    };


// Esta funcion se ejecuta automaticamente si la ventana se llama
//obtiene las zonas 
    componentWillMount() {
        var self = this;
        let arreglo = [];
        axios.post("/allZonas", {}).then(res => {
            const respuesta = res.data;
            respuesta.forEach(zona=>{
                arreglo.push({
                    value:zona.nombre,
                    label:zona.nombre,
                    _id:zona._id

                })
            })   
            this.setState({
                zonas:arreglo
            })
        })

    }

//esta funcion se encarga de obtener todas las ramas y guardarlas en la 
//pagina
    obtenerRamas(selectedZona){
        let arreglo =[];
        axios.post("/allRamaZona", {_id:selectedZona._id}).then(res => {
            const respuesta=res.data;
            respuesta.forEach(rama=>{
                    arreglo.push({
                        value:rama.nombre,
                        label:rama.nombre,
                        _id:rama._id
                    })
            })   
            this.setState({
                ramas:arreglo
            })
        })
    }

/*esta función se encarga de obtener todos los grupos y subirlos a la pantalla */
    obtenerGruposFrom(selectedRama){
        var self = this;
        let arreglo =[];
        axios.post("/allGruposRama", {_id:selectedRama._id}).then(res => {
            const respuesta=res.data;
            respuesta.forEach(grupo=>{
                    arreglo.push({
                        value:grupo.nombre,
                        label:grupo.nombre,
                        _id:grupo._id
                    })
            })   
            this.setState({
                grupoFrom:arreglo,
                grupoTo: arreglo
            })
        })
    }

// esta función se encarga de obtener todos los registros de personas,
// y los guarda en la pantalla
    obtenerPersonas(selectedGrupoFrom){
        var self = this;
        let arreglo =[];
        axios.post("/allMiembrosGrupos", {_id:selectedGrupoFrom._id}).then(res => {
            const respuesta=res.data;
            respuesta.forEach(persona=>{
                arreglo.push({
                    value:persona.nombre,
                    label:persona.nombre,
                    _id:persona._id

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
            this.state.selectedRama.length != 0 && this.state.selectedGrupoFrom.length != 0 &&
            this.state.selectedGrupoTo.length != 0){
            axios.post("/cambiarMiembroGrup",{
                nombre:this.state.selectedNombre,
                zona:this.state.selectedZona,
                rama:this.state.selectedRama,
                grupoFrom:this.state.selectedGrupoFrom,
                grupoTo: this.state.selectedGrupoTo
            }).then(res =>{
                if(!res.data.success1 && !res.data.success2){
                    alert(res.data.error1, res.data.error2);
                }
                else{
                    alert("Miembro trasladado correctamente")
                    this.setState({
                        selectedNombre:[],
                        selectedZona:[],
                        selectedRama:[],
                        selectedGrupoFrom:[],
                        selectedGrupoTo:[]
                    })
                }
            })
        }
        else{
            alert("Ingrese todos los datos")
        }
    }


 /* esta funcion se encarga de limpiar los states de los componentes*/
    limpiarRamas(){
        this.state.selectedRamaFrom = []
    }

/* esta funcion se encarga de limpiar los states de los componentes*/
    limpiarGrupos(){
        this.state.selectedGrupoFrom = []
        this.state.selectedGrupoTo = []
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
                        <h2>Trasladar miembro de grupo</h2>
                        <div id="center-section">
                            <div class="form-group" class="spacing-base">
                                <label for="zona">Seleccione la zona a la que pertenece la persona:</label>
                                <Select components={makeAnimated} name="zonaFrom" value={this.state.selectedZona} className="basic-multi-select"
                                    options={this.state.zonas} classNamePrefix="select" onChange={this.handleChangeZonas} />
                            </div>
                            <div class="form-group" class="spacing-base">
                                <label for="rama">Seleccione la rama a la que pertenece la persona:</label>
                                <Select components={makeAnimated} name="ramaFrom" value={this.state.selectedRama} className="basic-multi-select"
                                    options={this.state.ramas} classNamePrefix="select" onChange={this.handleChangeRamas} />
                            </div>
                            <div class="form-group" class="spacing-base">
                                <label for="grupo">Seleccione el grupo al que pertenece la persona:</label>
                                <Select components={makeAnimated} name="grupoFrom" value={this.state.selectedGrupoFrom} className="basic-multi-select"
                                    options={this.state.grupoFrom} classNamePrefix="select" onChange={this.handleChangeGrupoFrom} />
                            </div>
                            <div class="form-group" class="spacing-base">
                                <label for="grupoTo">Seleccione el grupo al que pertenecerá la persona:</label>
                                <Select components={makeAnimated} name="grupoTo" value={this.state.selectedGrupoTo} className="basic-multi-select"
                                    options={this.state.grupoTo} classNamePrefix="select" onChange={this.handleChangeGrupoTo} />
                            </div>
                            <div class="form-group" class="spacing-base">
                                <label for="grupoTo">Nombre de la persona a cambiar de grupo:</label>
                                <Select components={makeAnimated} name="nombre" value={this.state.selectedNombre} className="basic-multi-select"
                                    options={this.state.nombres} classNamePrefix="select" onChange={this.handleChangeNombre} />
                            </div>
                            <button type="button" class="btn btn-dark" onClick={this.onClick}>Cambiar</button>
                        </div>
                    </form>
                </main>
            </div>
        )
    };

}

export default TrasladarMiembro;