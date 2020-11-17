import React, { Component } from 'react'
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
//import './miembrosXelemento.css' 
import Card from './Card1'
import Header from '../General/Header';
import axios from 'axios';


export default class miembroXelemento extends Component {
    state = {
        resultMembers: [],
        selectedZona: [],
        selectedRoma: [],
        selectedGrupo: [],
        zonas: [],
        ramas: [],
        grupo: []

    }


    /*Esta funcion lo que hace es asignar los datos del componente en su respectivo state */
    onChange = (e) => this.setState({
        [e.target.name]: e.target.value
    });


    /*Esta funcion lo que hace es asignar los datos del componente en su respectivo state */
    handleChangeZona = zona => {
        this.setState(
            { zona },
        );
    };

    /*Esta funcion lo que hace es asignar los datos del componente en su respectivo state */
    handleChangeRama = rama => {
        this.setState(
            { rama },
        );
    };

    /*Esta funcion lo que hace es asignar los datos del componente en su respectivo state */
    handleChangeGrupo = grupo => {
        this.setState(
            { grupo },
        );
    };

    /* esta función se ejecuta automaticamente, trae de todas las zonas,ramas,grupos
    y las guarda en la ventana 
    */
    componentWillMount() {
        var self = this;
        let arreglo = [];
        let arrRama = [];
        let arrGrup = [];
        axios.post("/allZonas", {}).then(res => {
            const respuesta = res.data;
            respuesta.forEach(zona => {
                arreglo.push({
                    value: zona.nombreZona,
                    label: zona.nombreZona
                })
            })
            this.setState({
                selectedZona: arreglo
            })
        })

        axios.post("/allRama", {}).then(res => {
            const respuesta = res.data;
            respuesta.forEach(rama => {
                arrRama.push({
                    value: rama.nombreRama,
                    label: rama.nombreRama
                })
            })
            this.setState({
                selectedRama: arrRama
            })
        })

        axios.post("/allGrupo", {}).then(res => {
            const respuesta = res.data;
            respuesta.forEach(grupo => {
                if (grupo.monitores.length != 0) {
                    arrGrup.push({
                        value: grupo.nombreGrupo,
                        label: grupo.nombreGrupo
                    })
                }
            })
            this.setState({
                selectedGrupo: arrGrup
            })
        })
    }

    /*Esta funcion se encarga de renderizar el hmtl*/
    render() {
        return (
            <div >
                <Header></Header>
                <div id="box-container" >
                    <div id="center-section">
                        <div id="main-section">
                            <div className="spacing-base">
                                <label>Zonas</label>
                                <Select components={makeAnimated} name="zona" onChange={this.handleChangeZona}
                                    value={this.state.zona} options={this.state.selectedZona} classNamePrefix="select" />
                            </div>
                        </div>

                        <div id="main-section">
                            <div className="spacing-base">
                                <label> Ramas </label>
                                <Select components={makeAnimated} name="rama" onChange={this.handleChangeRama}
                                    value={this.state.rama} options={this.state.selectedRama} classNamePrefix="select" />
                            </div>
                        </div>
                        <div id="main-section">
                            <div className="spacing-base">
                                <label> Grupo </label>
                                <Select components={makeAnimated} name="grupo" onChange={this.handleChangeGrupo}
                                    value={this.state.grupo} options={this.state.selectedGrupo} classNamePrefix="select" />
                            </div>
                        </div>
                    </div >
                </div>
                <div className="box-container">
                    {this.state.resultMembers.map((p, index) =>
                        (<Card key={p._id} index={index} miembroData={p} isFriend={false} />)
                    )}
                </div>
            </div>
        )
    };
}