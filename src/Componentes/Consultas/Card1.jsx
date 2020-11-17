import React, { Component } from 'react'
import Card from 'react-bootstrap/Card'
import './Card1.css'

export default class Card1 extends Component {

    state = {

    }
/*Esta función se encarga de renderizar el HTML*/
    render() {
        const { id,nombre}= this.props.miembroData;
        return (
            <div className="card1-container" >
                <Card style={{width: '18rem'}}>
                <Card.Body>
                    <Card.Title>{nombre}</Card.Title>
                    <Card.Text>
                        Some quick example text to build on the card title and make up the bulk of
                        the card's content.
                    </Card.Text>
                    <Card.Link href="#">Card Link</Card.Link>
                    <Card.Link href="#">Another Link</Card.Link>
                </Card.Body>
            </Card>

            </div>
            
        )
    };

}
