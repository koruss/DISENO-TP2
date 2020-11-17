import React, { Component } from 'react'
//import './GrupoRolesXMiembro.css'
import Card from './CardGrupoRoles'
import '../../Componentes/General/Utils.css'
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import Header from '../General/Header.jsx';
import axios from 'axios';


// Clase encargada de la visualización de los grupo sy roles que tienen los miembros  
// en la aplicación
export default class GrupoRolesXMiembro extends Component {

    // El state guarda los datos brindados por el usuario
    // para ser utilizados cuando se cree en la aplicación
    state = {
        selectedMiembro: [],
        miembros: [],
        grupos:[]
    }

    onChange = (e) => this.setState({
        [e.target.name]: e.target.value
    });



    // Llena los arreglos con la información requerida para presentar
    // cuando se accede a la ventana
    componentWillMount() {
        var self = this;
        let arreglo = [];
        axios.post("/allPersona", {}).then(res => {
            const respuesta = res.data;
            respuesta.forEach(persona => {
                arreglo.push({
                    value: persona.nombre,
                    label: persona.nombre +" "+persona.apellido1+" "+persona.apellido2,
                    id:persona._id
                })
            })
            this.setState({
                miembros: arreglo
            })
        })
    }

    obtenerInformacionGrupos(selectedMiembro){
        var self = this;
        let arreglo = [];
        axios.post("/allGrupos", {}).then(res => {
            const respuesta=res.data;
            const miembrosGrupo = this.state.selectedMiembro
            respuesta.forEach(persona =>{
                persona.monitores.forEach(monitor =>{
                    if (monitor.nombre == miembrosGrupo.value){
                        arreglo.push({
                            grupo: persona.nombreGrupo,
                            rama: persona.nombreRama,
                            rol: "Monitor"
                        })
                    }
                })
    
                persona.jefesGrupo.forEach(jefe =>{
                    if (jefe.nombre == miembrosGrupo.value){
                        arreglo.push({
                            grupo: persona.nombreGrupo,
                            rama: persona.nombreRama,
                            rol: "Jefe"
                        })
                    }
                }
                )
    
                persona.miembros.forEach(miembro =>{
                    if (miembro.nombre == miembrosGrupo.value){
                        arreglo.push({
                            grupo: persona.nombreGrupo,
                            rama: persona.nombreRama,
                            rol: "Miembro"
                        })
                    }
                })
    
            })
            
        this.setState({
            grupos: arreglo
        })

        })
    }

    // Setean los datos seleccionados en los comboBox
    // y pasan la información a la ejecución del boton
    handleChangeMiembro = selectedMiembro => {
        this.setState(
            { selectedMiembro },
        );

        this.obtenerInformacionGrupos(selectedMiembro);
    };

    // En esta parte se hace el diseño de la ventana para mostrar grupos y roles
    // y se llama a las funciones anteriores.
    render() {

        return (
            <div>
                <form >
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    {/* <style dangerouslySetInnerHTML={{ __html: "\nbody {font-family: Arial, Helvetica, sans-serif;}\n* {box-sizing: border-box;}\n\ninput[type=text], select, textarea {\n width: 100%;\n padding: 12px;\n border: 1px solid #ccc;\n border-radius: 4px;\n box-sizing: border-box;\n margin-top: 6px;\n margin-bottom: 16px;\n resize: vertical;\n}\n\ninput[type=submit] {\n background-color: #4CAF50;\n color: white;\n padding: 12px 20px;\n border: none;\n border-radius: 4px;\n cursor: pointer;\n}\n\ninput[type=submit]:hover {\n background-color: #45a049;\n}\n\n.container {\n border-radius: 5px;\n background-color: #f2f2f2;\n padding: 20px;\n}\n" }} /> */}
                    <Header></Header>
                    <div className="spacing-base"></div>
                    <h3>GRUPOS Y ROLES POR MIEMBRO</h3>
                    <div className="container">
                        <form action="/action_page.php">
                            <div className="spacing-base"></div>
                            <div class="form-group" class="spacing-base">
                                <label for="grupo">Seleccione el Miembro:</label>
                                <Select components={makeAnimated} name="grupo" onChange={this.handleChangeMiembro}
                                    value={this.state.selectedMiembro} options={this.state.miembros} classNamePrefix="select" />
                            </div>
                            <div id="center-section">
                                <div className="label-wrapper">
                                    <div class="form-group" class="spacing-base">
                                        <label for="nombre">Información:</label>
                                        {this.state.grupos.map((p, index) =>
                                            (<Card index={"Miembro"} miembroData={p} />))
                                        }
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </form>
            </div>
        );
    }
}