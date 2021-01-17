import React, { Component } from 'react'
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import Button from 'react-bootstrap/Button'
import axios from 'axios';
import Header from '../General/Header.jsx';
import './Noticias.css'



export default class CrearNoticia extends Component {

    state = {
        opciones: [
            { value: "Movimiento", label: "Movimiento" },
            { value: "Zona", label: "Zona" },
            { value: "Rama", label: "Rama" },

        ],
        selectedOpcion: null,
        sesion: null,
        noticia:null
    }

    componentDidMount() {
        axios.post("/getSesion", {}).then(res => {
            this.setState({
                sesion: res.data
            })

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
                                    <label>
                                        Publicar a Nivel: 
                                    </label>
                                    <Select components={makeAnimated} name="selectedZona" value={this.state.selectedZona}
                                        onChange={this.handleChange} options={this.state.opciones} className="basic-multi-select" classNamePrefix="select" />
                                </div>
                                <div >
                                    <textarea style={{ width: "350px", height: "100px", resize: "none" }} value={this.state.value} onChange={this.handleChange} />
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