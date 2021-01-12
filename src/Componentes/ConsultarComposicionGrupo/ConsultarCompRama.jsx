import React, { Component } from 'react'
import './ConsultarCompGrupo.css'
import '../../Componentes/General/Utils.css'
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import Header from '../General/Header.jsx';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Nav, NavDropdown } from 'react-bootstrap';

class ConsultarComposicionRama extends Component {
    state = {
        idMovimiento: "",
        idUsuario: "",
        info: [],
        ramas: [],
        selectedRama: [],
        pointerNull: 'none'

    }
    /*Esta funcion lo que hace es asignar los datos del componente en su respectivo state */
    onChange = (e) => this.setState({
        [e.target.name]: e.target.value
    });



    /*Esta funcion lo que hace es asignar los datos del componente en su respectivo state */


    limpiarGrupo() {
        this.state.selectedRama = []
    }
    /*Esta funcion lo que hace es asignar los datos del componente en su respectivo state */
    handleChangeRama = selectedRama => {
        const seleccionado = this.state.info.find(element => element._id == selectedRama._id)
        this.setState(
            { selectedRama: seleccionado }
        );
    };
    /* Esta funcion se ejecuta automaticamente,
    obtiene todas las zonas y las gurada en la ventana*/
    componentDidMount() {
        this.obtenerCodigoMovimiento();
    }

    obtenerCodigoMovimiento() {
        let arreglo = [];
        let respuesta;
        axios.post('/getSesion', {}).then((res) => {
            console.log(res);
            axios.post("/composicionRama", {
                idUsuario: res.data.id_persona,
                // tipoUsuario:res.data.tipo
            }).then(data => {
                respuesta = data.data;
                this.setState({
                    info: respuesta
                })
                respuesta.forEach(grupo => {
                    console.log(grupo)
                    arreglo.push({
                        label: grupo.nombre,
                        value: grupo.nombre,
                        _id: grupo._id
                    })
                })
            })
            this.setState({

                ramas: arreglo,
                idMovimiento: res.data.id_movimiento,
                idUsuario: res.data.id_persona
            })
        })
    }


    /* Se encarga de renderizar el html */
    render() {
        return (
            <div>
                <Header></Header>
                <main className="container">
                    <div id="center-section">
                        <div class="form-group" class="spacing-base">
                            <label for="rama">Seleccione la Rama:</label>
                            <Select components={makeAnimated} name="rama" onChange={this.handleChangeRama}
                                options={this.state.ramas} classNamePrefix="select" />
                        </div>

                        <button>
                            <Link to={{ pathname: '/consultarGrupoResult', data: {info:this.state.selectedRama,tipo:"Rama"}}}>Consultar</Link>
                        </button>
                    </div>

                </main>
            </div>
        )
    };

}

export default ConsultarComposicionRama;