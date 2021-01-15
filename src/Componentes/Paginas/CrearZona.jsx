import React, { Component } from 'react'
import axios from 'axios';
import Button from 'react-bootstrap/Button'
import "./Estructura.css"
import Header from '../General/Header.jsx';



// Clase encargada de la creación de zonas  
// en la aplicación
class CrearZona extends Component {

    // Metodo constructor de la clase que recibe los props para 
    // la creación de grupos dentro de la aplicación
    constructor(props){
        super(props);
        this.zonaRef=React.createRef();
    }

    // El state guarda los datos brindados por el usuario
    // para ser utilizados cuando se cree en la aplicación
    state = {
        nombreZona: ""
    }

    onChange = (e) => this.setState({ [e.target.name]: e.target.value });


    //Funcion para manejar los eventos de un boton
    onClick = (e) => {
        if(this.state.nombreZona != ""){
            axios.post('/getSesion',{}).then((res) =>{
                axios.post("/guardarZona", {
                    nombreZona: this.state.nombreZona,
                    id_movimiento:res.data.id_movimiento
                        }).then(res => {
                        if (!res.data.success) {
                            alert(res.data.error);
                        }
                        else {
                            alert("Zona Guardada correctamente")
                            this.zonaRef.current.value="";
                        }
                })
            })
        }
        else{
            alert("Ingrese todo los datos")
        }
    }


    // En esta parte se hace el diseño de la ventana de Creación de zonas
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
                                    <h1 class="h1">Crear Zona</h1>
                                    <div>
                                        <label> Nombre de la nueva zona</label>
                                        <input ref={this.zonaRef} type="text" name="nombreZona" autoComplete="on" onChange={this.onChange} tabIndex="1"></input>
                                    </div>
                                </div>
                                <div>
                                    <Button variant="dark" onClick={this.onClick}>Crear zona</Button>
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

export default CrearZona;