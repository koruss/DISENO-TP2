import React, { Component } from 'react'
import Card from 'react-bootstrap/Card'
import './CardGrupoResult.css'

export default class CardGrupoResult extends Component {

    state = {
        nombre: "",
        apellido: "",
        indice: ""
    }
/*Se encarga de renderizar el codigo html*/
    render() {
        this.state.nombre = this.props.miembroData.nombre;
        this.state.indice = this.props.index;  
        this.state.apellido = this.props.miembroData.apellido1;
        this.state.telefono = this.props.miembroData.telefono;
        this.state.correo = this.props.miembroData.correo;
        this.state.direccion = this.props.miembroData.direccion;
        return (
            <div >
                <Card style={{ width: '13rem' }}>
                    <Card.Body>
                        <Card.Title>{this.state.indice}</Card.Title>
                        <Card.Text>
                            {this.state.nombre} {this.state.apellido}
                        </Card.Text>
                        <Card.Text>
                            Correo: {this.state.correo}
                        </Card.Text>
                        <Card.Text>
                            Telefono:
                            {this.state.telefono}
                        </Card.Text>
                        <Card.Text>
                            Direccion:
                            {this.state.direccion.pais+", "+this.state.direccion.provincia+", "+this.state.direccion.canton+", "+this.state.direccion.distrito }
                        </Card.Text>
                    </Card.Body>
                </Card>
            </div>
        )
    };
}