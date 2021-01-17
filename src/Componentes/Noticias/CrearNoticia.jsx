import React, { Component } from 'react'
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import Button from 'react-bootstrap/Button'
import axios from 'axios';
import Header from '../General/Header.jsx';




export default class CrearNoticia extends Component {

    state = {
        opciones: [],
        selectedOpcion: null,
        sesion:null,
        noticia:null
    }

    componentDidMount() {
        axios.post("/getSesion", {}).then(res => {
            this.setState({
                sesion:res.data
                
            })
            this.obtenerInformacion(this.state.sesion.id_persona)
        })
    }

    obtenerInformacion(_id){
        var self = this;
        let arreglo=[]
        axios.post("/getLugares", {_id}).then(res=>{
            const respuesta=res.data
            respuesta.zonas.forEach(lugar=>{
                arreglo.push({
                    value:lugar.nombre,
                    label:lugar.nombre,
                    _id:lugar._id,
                    etiqueta:"1"
                })
            })
            respuesta.ramas.forEach(lugar=>{
                arreglo.push({
                    value:lugar.nombre,
                    label:lugar.nombre,
                    _id:lugar._id,
                    etiqueta:"2"
                })
            })
            arreglo.push({
                value:this.state.sesion.nombre_movimiento,
                label:this.state.sesion.nombre_movimiento,
                _id:this.state.sesion.id_movimiento,
                etiqueta:"0"
            })
            this.setState({
                opciones: arreglo
            })
        })

    }

    

    onChange = (e) => this.setState({
        [e.target.name]: e.target.value
    });

    handleChangeOpcion = selectedOpcion => {
        this.setState(
            { selectedOpcion },     
        );
    };

    handleChangeNoticia = noticia => {
        this.setState(
            { noticia },     
        );
    };

    onClick = (e) => {
        axios.post("/CrearNoticia",{
            autorNombre: this.state.sesion.nombre_persona,
            autor_id: this.state.sesion.id_persona,
            noticia: this.state.noticia,
            nivel: this.state.selectedOpcion
        }).then(res=>{
            if(!res.data.success){
                alert(res.data.error);
            }else{
                alert("Noticia creada correctamente")
                this.setState({
                    selectedOpcion:[],
                    noticia:null
                })
            }
        })
    }

    render() {
        return (
            <div>
                <Header></Header>
                <div id="center-section">
                    <div id="main-section">
                        <div class="border">
                            <div class="box-container">
                                <div className="spacing-base">
                                    <label>Publicar a Nivel: </label>
                                    <Select components={makeAnimated} name="selectedOpcion" value={this.state.selectedOpcion}
                                        onChange={this.handleChangeOpcion} options={this.state.opciones} className="basic-multi-select" classNamePrefix="select" />
                                </div>
                                <div >
                                <label>Texto de la noticia: </label>
                                <textarea style={{width:"350px",height:"100px", resize:"none"}}value={this.state.value} name="noticia" onChange={this.onChange} />

                                </div>
                                <div className="spacing-base">
                                    <button type="button" class="btn btn-dark" onClick={this.onClick} >Enviar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }



}