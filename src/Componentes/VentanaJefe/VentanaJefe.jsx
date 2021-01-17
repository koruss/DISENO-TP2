import React, { Component } from 'react'
import './VentanaJefe.css'
import '../../Componentes/General/Utils.css'
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import Header from '../General/Header';
import axios from 'axios';
import { Link } from 'react-router-dom';
import imagenAsesor from './perfil.png';
import imagenAsignacion from './asignacion.png';
import imagenDefinicion from './definicion.png';
import imagenMapa from './mapa.png';
import imagenJefes from './jefes.png';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';


// import Card from './CardGrupoResult'

// Clase que implementa la ventana asesor, es la ventana
// principal una vez se ingrese a la aplicación
class VentanaAsesor extends Component {
    state = {
        zonas:[],
        ramas:[],
        grupos:[]

    }

    // Esta funcion se ejecuta automaticamente si la ventana se llama
    //obtiene las zonas, los grupos y las ramas
    componentWillMount() {
        var self = this;
        let arreglo =[];
        let arrRama = [];
        let arrGrup = [];
        axios.post('/getSesion',{}).then((res) =>{
            const id_movimiento = res.data.id_movimiento;
            axios.post("/allZonas", {}).then(res => {
                const respuesta = res.data;
                respuesta.forEach(zona=>{
                    if(zona.idMovimiento == id_movimiento){
                        arreglo.push({
                            value:zona.nombre,
                            label:zona.nombre,
                            _id:zona._id

                        })
                    }
                })   
                this.setState({
                    zonas:arreglo
                })
            })

            axios.post("/allRama", {}).then(res => {
                const respuesta = res.data;
                respuesta.forEach(rama=>{
                    if(rama.idMovimiento == id_movimiento){
                        arrRama.push({
                            value:rama.nombre,
                            label:rama.nombre
                        })
                    }
                })   
                this.setState({
                    ramas:arrRama
                })
            })

            axios.post("/allGrupos", {}).then(res => {
                const respuesta = res.data;
                respuesta.forEach(grupo=>{
                    if(grupo.idMovimiento == id_movimiento){
                        arrGrup.push({
                            value:grupo.nombre,
                            label:grupo.nombre
                        })
                    }
                })   
                this.setState({
                    grupos:arrGrup
                })
            })
        })
    }
    /* Es la funcion encargada de levantar el codigo html */
    render() {
        return (
            <div>
                <Header></Header>
                <main className="container">
                    <div className="label-wrapper">
                        <div className="label-wrapper" >
                            <label for="imagen">Imagen del jefe ideal: </label>
                            <img src={imagenAsesor} alt={"imagenAsesor"} width="100" height="100"/>
                        </div>
                        <div className="label-wrapper" align="right">
                            <h2>Ventana Jefe</h2>
                        </div>
                        <div class="form-group" class="spacing-base-hard">
                            <label for="zona">Bienvenido a la aplicacion</label>
                        </div>
                        <div className="label-wrapper" >
                            <div class="form-group" class="spacing-base">
                                <label for="rama">Cantidad de zonas:</label>
                                <label for="rama">{this.state.zonas.length}</label>
                            </div>
                            <div class="form-group" class="spacing-base">
                                <label for="grupo">Cantidad de ramas:</label>
                                <label for="rama">{this.state.ramas.length}</label>
                            </div>
                            <div class="form-group" class="spacing-base">
                                <label for="grupo">Cantidad de grupos:</label>
                                <label for="rama">{this.state.grupos.length}</label>
                            </div>
                        </div>
                    </div>
                    <div className="label-wrapper">
                    <div className="label-wrapper-right" class="spacing-base-hard">
                        <h2>Funciones del sistema</h2>
                    </div>
                    <div className="label-wrapper" >
                            <div class="form-group" class="spacing-base">
                                <Link class="btn btn-dark" to='./consultaGruposPorMiembro'><img src={imagenAsignacion} alt={"imagenAsesor"} width="50" height="50" style={{"float":"left"}} />Ver puestos asignados</Link>                                
                            </div>
                            <div class="form-group" class="spacing-base">
                                <Link class="btn btn-dark" to='./registroMiembro'><img src={imagenJefes} alt={"imagenAsesor"} width="50" height="50" style={{"float":"left"}} />Crear publicacion</Link>    
                            </div>
                        </div>
                        <div className="label-wrapper" >
                            <div class="form-group" class="spacing-base">
                                <Link class="btn btn-dark" to='./consultaComposicionGrupo'><img src={imagenDefinicion} alt={"imagenAsesor"} width="50" height="50" style={{"float":"left"}} /> Consultar composicion de grupo</Link>    
                            </div>
                            <div class="form-group" class="spacing-base">
                                <Link class="btn btn-dark" to='./arbolEstructural'><img src={imagenMapa} alt={"imagenAsesor"} width="50x" height="50" style={{"float":"left"}} />Ver noticias</Link>    
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        )
    };

}

export default VentanaAsesor;