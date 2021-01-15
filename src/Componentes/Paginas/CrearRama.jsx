import React, { Component } from 'react'
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import Button from 'react-bootstrap/Button'
import axios from 'axios';
import "./Estructura.css"
import Header from '../General/Header.jsx';

// Clase encargada de la creación de ramas  
// en la aplicación
export default class CrearRama extends Component {

    // Metodo constructor de la clase que recibe los props para 
    // la creación de grupos dentro de la aplicación
    constructor(props){
        super(props);
        this.nombreRef=React.createRef();
    }

    // El state guarda los datos brindados por el usuario
    // para ser utilizados cuando se cree en la aplicación
    state = {
        selectedZona: [],
        zonas: [],
        nombreRama: ""
    }

    onChange = (e) => this.setState({
        [e.target.name]: e.target.value
    });

    // Setean los datos seleccionados en los comboBox
    // y pasan la información a la ejecución del boton
    handleChange = selectedZona => {
        this.setState(
            { selectedZona },     
        );
    };

    // Llena los arreglos con la información requerida para presentar
    // cuando se accede a la ventana
    componentWillMount() {
        var self = this;
        let arreglo =[];
        axios.post('/getSesion',{}).then((res) =>{
            const id_movimiento = res.data.id_movimiento;
            axios.post("/allZonas", {}).then(res => {
                const respuesta=res.data;
                respuesta.forEach(zona=>{
                if(zona.idMovimiento == id_movimiento){
                        arreglo.push({
                            value:zona.nombre,
                            label:zona.nombre,
                            identificacion:zona._id
                        })
                    }
                })
                
                this.setState({
                    zonas:arreglo
                })
            })
        })
    }

    //Funcion para manejar los eventos de un boton
    onClick = (e) => {
        if(this.state.selectedZona.length != 0 && this.state.nombreRama != ""){
            axios.post('/getSesion',{}).then((res) =>{
                axios.post("/guardarRama",{
                    nombreRama:this.state.nombreRama,
                    selectedZona:this.state.selectedZona,
                    id_movimiento:res.data.id_movimiento
                    }).then(res =>{
                        if(!res.data.success){
                            alert(res.data.error);
                        }
                        else{
                            alert("Rama guardada correctamente")
                            this.nombreRef.current.value="";
                            this.setState({
                                selectedZona:[]
                            })
                        }
                })
            })
        }
        else{
            alert("Ingrese todos los datos")
        }
    }

    // En esta parte se hace el diseño de la ventana de Creación de ramas
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
                                <h1 class="h1">Crear Rama</h1>
                                <div class="spacing-base">
                                    <label> Nombre de la nueva Rama</label>
                                    <input ref={this.nombreRef} type="text" name="nombreRama" autoComplete="on" onChange={this.onChange} tabIndex="1"></input>
                                </div>
                                <div className="spacing-base">
                                    <label>Zona a la que pertenece</label>
                                    <Select components={makeAnimated} name="selectedZona" value={this.state.selectedZona} 
                                    onChange={this.handleChange} options={this.state.zonas} className="basic-multi-select" classNamePrefix="select" />
                                </div>
                            </div>
                            <div>
                                <button type="button" class="btn btn-dark" onClick={this.onClick} >Guardar rama</button>
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
        )
    };
}