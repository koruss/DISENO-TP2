import React, { Component } from 'react'
import Card from 'react-bootstrap/Card'
import './CardGrupoRoles.css'

// Clase encargada de la visualización de los grupo y roles que tienen los miembros  
// en la aplicación
export default class CardGrupoRoles extends Component {


    // El state guarda los datos brindados por el usuario
    // para ser utilizados cuando se cree en la aplicación
    state = {
        rol: "",
        grupo: ""
    }

    // En esta parte se hace el diseño de la ventana para mostrar grupos y roles
    // y se llama a las funciones anteriores.
    render() {
        this.state.rol = this.props.miembroData.rol;
        this.state.grupo = this.props.miembroData.grupo;

        return (
            <div className="card1-container" >
                {/* <div id="center-section"> */}
                    <Card style={{ width: '13rem' }}>
                        <Card.Body>
                            <Card.Title></Card.Title>
                            <Card.Text>
                                | Rol: {this.state.rol} | {this.state.grupo} | 
                            </Card.Text>
                        </Card.Body>
                    </Card>
                {/* </div> */}
            </div>
        )
    };
}