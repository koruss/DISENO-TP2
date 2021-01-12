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
        jefes:[],
        monitor:[],
        idMiembroAMostrar:"",
        codigo_movimiento: "",
        nombre_persona: ""
    }

    onChange = (e) => this.setState({
        [e.target.name]: e.target.value
    });



    // Llena los arreglos con la información requerida para presentar
    // cuando se accede a la ventana
    componentWillMount() {
        var self = this;
        let arreglo=[]
        axios.post('/getSesion',{}).then((res) =>{
            // console.log(res.data)
            arreglo.push({_id: res.data.id_persona})
            this.setState({
                codigo_movimiento:res.data.id_movimiento,
                nombre_persona:res.data.nombre_persona,
                idMiembroAMostrar:res.data.id_persona
            })
            this.obtenerInformacionMiembros(this.state.idMiembroAMostrar)
            this.obtenerInformacionJefes(this.state.idMiembroAMostrar)
            this.obtenerInformacionMonitores(this.state.idMiembroAMostrar)
        })
    }

    obtenerInformacionMiembros(_id){
        var self = this;
        let arreglo = [];
        axios.post("/allMiembrosPorMiembro", {_id}).then(res => {
            const respuesta=res.data;
            respuesta.forEach(persona =>{
                arreglo.push({
                    grupo: persona.nombre,
                    rol: "Miembro"
                })
    
            })
            this.setState({
                miembros: arreglo
            })
        })
    }

    obtenerInformacionJefes(_id){
        var self = this;
        let arreglo = [];
        axios.post("/allJefesPorMiembro", {_id}).then(res => {
            const respuesta=res.data;
            respuesta.forEach(persona =>{
                arreglo.push({
                    grupo: persona.nombre,
                    rol: "Jefe"
                })
    
            })
            this.setState({
                jefes: arreglo
            })
        })
    }

    obtenerInformacionMonitores(_id){
        var self = this;
        let arreglo = [];
        axios.post("/allMonitoresPorMiembro", {_id}).then(res => {
            const respuesta=res.data;
            respuesta.forEach(persona =>{
                arreglo.push({
                    grupo: persona.nombre,
                    rol: "Monitor"
                })
    
            })
            this.setState({
                monitor: arreglo
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
                    <h3>PUESTOS EN EL MOVIMIENTO</h3>
                    <div className="container">
                        <form action="/action_page.php">
                            <div className="spacing-base"></div>
                            <div class="form-group" class="spacing-base">
                                <h3 for="grupo">Nombre: {this.state.nombre_persona}</h3>
                                {/* <Select components={makeAnimated} name="grupo" onChange={this.handleChangeMiembro}
                                    value={this.state.selectedMiembro} options={this.state.miembros} classNamePrefix="select" /> */}
                            </div>
                            <div id="center-section">
                                <div>
                                    <label for="nombre">Información:</label>
                                    <div class="form-group" class="spacing-base">
                                        <label for="miembro">Miembro</label>
                                        {this.state.miembros.map((p, index) => (<Card index={"Miembro"} miembroData={p} />))}
                                    </div>
                                </div>
                                <div className="label-wrapper">
                                    <div class="form-group" class="spacing-base">
                                        <label for="jefe">Jefes</label>
                                        {this.state.jefes.map((p, index) => (<Card index={"Jefe"} miembroData={p} />) )}
                                    </div>
                                </div>
                                <div className="label-wrapper">
                                    <div class="form-group" class="spacing-base">
                                        <label for="monitor">Monitores</label>
                                        {this.state.monitor.map((p, index) =>  (<Card index={"Monitor"} miembroData={p} />) )}
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