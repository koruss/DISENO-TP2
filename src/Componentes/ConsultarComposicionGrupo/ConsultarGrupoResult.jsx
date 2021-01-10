import React, { Component } from 'react'
import './ConsultarGrupoResult.css'
import '../../Componentes/General/Utils.css'
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import Header from '../General/Header';
import Card from './CardGrupoResult'
import axios from 'axios';

class ConsultarGrupoResult extends Component {
    state = {
        grupo:  "",
        zona: "",
        rama: "",
        jefe: [],
        monitores: [],
        miembros: []
    }

    onChange = (e) => this.setState({
        [e.target.name]: e.target.value
    });


    handleChange = selectedOption => {
        this.setState(
            { selectedOption },
            () => console.log(`Option selected:`, this.state.selectedOption)
        );
    };


    render() {
         this.state.info = this.props.location.data;


        return (
            <div>
                <Header></Header>
                <main className="container">
                    <div id="center-section">
                        <h2>Nombre del Grupo: {this.state.info.nombre}</h2>
                    </div>
                    <div>
                        <label for="CantMiembros">Cantidad de personas</label>
                        <label for="ResultCantMiembros">{this.state.info.miembros.length+
                        this.state.info.jefes.length +this.state.info.monitores.length }</label>
                        <label for="CantMiembros">Cantidad de miembros</label>
                        <label for="ResultCantMiembros">{this.state.info.miembros.length}</label>
                    </div>
                    {/* <div className="label-wrapper">
                        <div class="form-group" class="spacing-base">
                            <label for="zona">Zona a la que pertenece:</label>
                            <label for="zona">{this.state.zona}</label>
                        </div>
                    </div>

                    <div className="label-wrapper">
                        <div class="form-group" class="spacing-base">
                            <label for="rama">Rama a la que pertenece:</label>
                            <label for="rama">{this.state.rama}</label>
                        </div>
                    </div> */}
                    <div className="label-wrapper">
                        <div class="form-group" class="spacing-base">
                            <label for="jefe">Jefes</label>
                            {this.state.info.jefes.map((p, index) => (<Card index={"Jefe"} miembroData={p} />) )}
                        </div>
                    </div>
                    <div className="label-wrapper">
                        <div class="form-group" class="spacing-base">
                            <label for="monitores">Monitores</label>
                            {this.state.info.monitores.map((p, index) =>  (<Card index={"Monitor"} miembroData={p} />) )}
                        </div>
                    </div>

                    <div className="label-wrapper">
                        <div class="spacing-base-hard">
                            <div class="form-group" class="spacing-base">
                            <label for="monitores">Miembros:</label>
                                {this.state.info.miembros.map((p, index) =>
                                    (<Card index={"Miembro"} miembroData={p} />))
                                }
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        )
    };

}

export default ConsultarGrupoResult;