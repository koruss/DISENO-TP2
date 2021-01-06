import React, { Component } from 'react'
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import "./Estructura.css"
import Header from '../General/Header.jsx';
import axios from 'axios';


// Clase encargada de la creación de grupos  
// en la aplicación
export default class CrearGrupo extends Component {


    // Metodo constructor de la clase que recibe los props para 
    // la creación de grupos dentro de la aplicación
    constructor(props){
        super(props);
        this.nombreRef=React.createRef();
    }


    // El state guarda los datos brindados por el usuario
    // para ser utilizados cuando se cree en la aplicación
    state = {
        ramasCompletas: [],
        selectedZona: [],
        selectedRama:[],
        zonas: [],
        ramas: [],
        nombreGrupo: "",
        nombreRama: ""
    }

    onChange = (e) => this.setState({
        [e.target.name]: e.target.value
    });


    // Setean los datos seleccionados en los comboBox
    // y pasan la información a la ejecución del boton
    handleChangeZona = selectedZona => {
        this.setState(
            { selectedZona }
        );
        this.limpiarRamas();
        this.obtenerRamas(selectedZona);
    }

    handleChangeRama = selectedRama => {
        this.setState(
            {selectedRama}
        );
    }

    // Llena los arreglos con la información requerida para presentar
    // cuando se accede a la ventana
    componentWillMount() {
        let arreglo =[];
        axios.post("/allZonas", {}).then(res => {
            const respuesta=res.data;
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

    obtenerRamas(selectedZona){
        let arreglo =[];
        axios.post("/allRamaZona", {_id:selectedZona._id}).then(res => {
            const respuesta=res.data;
            respuesta.forEach(rama=>{
                    arreglo.push({
                        value:rama.nombre,
                        label:rama.nombre,
                        identificacion:rama._id
                    })
            })   
            this.setState({
                ramas:arreglo
            })
        })
    }

    limpiarRamas(){
        this.state.selectedRama = []
    }



    //Funcion para manejar los eventos de un boton
    onClick = (e) => {
        if(this.state.nombreGrupo != "" && this.state.selectedRama.length != 0 &&
        this.state.selectedZona.length != 0){
            axios.post("/guardarGrupo",{
                nombreGrupo:this.state.nombreGrupo,
                selectedZona:this.state.selectedZona,
                selectedRama:this.state.selectedRama
            }).then (res =>{
                if(!res.data.success){
                    alert(res.data.error);
                }
                else{
                    alert("Grupo guardado correctamente");
                    this.nombreRef.current.value="";
                    this.setState({
                        selectedRama:[],
                        selectedZona:[],
                        ramas:[]
                    })
                }
            })
        } 
        else{
            alert("Por favor ingresar todos los datos");
        }
    }

    // En esta parte se hace el diseño de la ventana de Creación de grupos
    // y se llama a las funciones anteriores.
    render() {
        return (
           <div>
            <Header></Header>
            <div id="center-section">
                <div id="main-section">
                    <div class="border">
                        <div class="box-container">
                            <div class="spacing-base">
                                <h1 class="h1">Crear Grupo</h1>
                                <div class="spacing-base">
                                    <label> Nombre del Nuevo Grupo</label>
                                    <input ref={this.nombreRef} type="text" name="nombreGrupo" autoComplete="on" onChange={this.onChange} tabIndex="1"></input>
                                </div>
                                <div className="spacing-base">
                                    <label>Zona a la que pertenece</label>
                                    <Select components={makeAnimated} name="zonas" value={this.state.selectedZona} onChange={this.handleChangeZona} 
                                    options={this.state.zonas} className="basic-multi-select" classNamePrefix="select"/>
                                <div className="spacing-base">
                                    <label>Rama a la que pertenece</label>
                                    <Select components={makeAnimated} name="ramas" value={this.state.selectedRama} onChange={this.handleChangeRama} 
                                    options={this.state.ramas} className="basic-multi-select" classNamePrefix="select" />
                                </div>
                                <div>
                                    <button type="button" class="btn btn-dark" onClick={this.onClick} >Guardar grupo </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="border">
                        <div class="box-container">
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
        )
    };

}