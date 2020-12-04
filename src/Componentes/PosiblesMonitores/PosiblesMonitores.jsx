import React, { Component } from 'react'
import axios from 'axios';
import Button from 'react-bootstrap/Button'
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import './PosiblesMonitores.css'
import '../../Componentes/General/Utils.css'
import Header from '../General/Header';

// Clase encargada de la transferencia de un miembro 
// de un grupo a otro
class PosiblesMonitores extends Component {
    
    state = {
        selectedPersona:[],
        personas:[]
    }


    onChange = (e) => this.setState({[e.target.name]:e.target.value});

// Esta funcion se ejecuta automaticamente si la ventana se llama
//obtiene las zonas 
    componentWillMount() {
        this.obtenerPersonas();

    }


    obtenerPersonas(){
        let arrPers = [];
        axios.post("/allPersona", {}).then(res => {
            const respuesta = res.data;
            respuesta.forEach(nombre=>{
                if(nombre.estado==false && nombre.posibleMonitor!=true){
                    arrPers.push({
                        value:nombre.nombre,
                        label:nombre.nombre,
                        datosPersona:[{ _id:nombre._id,
                            direccion: nombre.direccion,
                            nombre:nombre.nombre,
                            identificacion:nombre.identificacion,
                            apellido1:nombre.apellido1,
                            apellido2:nombre.apellido2,
                            correo:nombre.correo,
                            telefono:nombre.telefono,
                            estado:nombre.estado }]
                    })
                }
            })   
            this.setState({
                personas:arrPers
            })
        })
    }

 /*esta funcion se ejecuta al ser precionado el botón
se encagada de recuperar los datos de los componentes 
y enviarlos a la API*/
    onClick = (e) => {
        if(this.state.selectedPersona.length != 0 ){
            axios.post("/cambiarPosibleMonitor",{
                persona:this.state.selectedPersona
            }).then(res =>{
                if(!res.data.success){
                    alert(res.data.error);
                }
                else{
                    alert("Miembro establecido como posible monitor correctamente")
                    this.setState({
                        selectedPersona:[]
                    })
                    this.obtenerPersonas() //hacer que el component will mount llame esta funcion que va a tener lo otro adentro
                }
            })
        }
         else{
             alert("Ingrese todos los datos")
         }
    }

 /*Esta funcion lo que hace es asignar los datos del componente en su respectivo state */
    handleChangePersona = selectedPersona => {
        this.setState(
            { selectedPersona },     
        );
    };


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
                                <label for="grupoTo">Nombre del posible monitor:</label>
                                <Select components={makeAnimated} name="nombre" value={this.state.selectedPersona} className="basic-multi-select"
                                    options={this.state.personas} classNamePrefix="select" onChange={this.handleChangePersona} />
                            </div>
                            <button type="button" class="btn btn-dark" onClick={this.onClick}>Establecer posible monitor</button>
                        </div>
                    </form>
                </main>
            </div>
        )
    };

}

export default PosiblesMonitores;