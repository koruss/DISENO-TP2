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
        this.state.apellido = this.props.miembroData.apellido1
        
        return (
            <div >
                <Card style={{ width: '13rem' }}>
                    <Card.Body>
                        <Card.Title>{this.state.indice}</Card.Title>
                        <Card.Text>
                            {this.state.nombre} {this.state.apellido}
                        </Card.Text>
                    </Card.Body>
                </Card>
            </div>
        )
    };
}