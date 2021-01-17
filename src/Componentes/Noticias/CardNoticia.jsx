import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import axios from 'axios';




export default class CardNoticia extends Component {
    state = {
        noticia: ""
    }

    btnClick=(e)=>{// este boton cambia el state
        //axios.post()
        this.dismiss();
        
    }
    dismiss(){
        this.props.unmountMe(this.props.index,this.state._id);
    }


    render() {
        this.state.session = this.props.session;
        this.state.noticia = this.props.noticiaData.noticia;
        this.state.fecha = this.props.noticiaData.fecha;
        this.state.autor = this.props.noticiaData.autor;
        this.state._id = this.props.noticiaData._id;
        
        return (
            <div >
                <Card style={{ width: '80%', backgroud: "#", "margin-left": "10%", "margin-right": "10%", "margin-top": "10px", border: "1px solid #333" }}>
                    <Card.Body>
                        <Card.Title style={{ "text-align": "center" }}>{this.state.fecha}</Card.Title>
                        <Card.Text>
                            Autor: {this.state.autor}
                        </Card.Text>
                        <Card.Text>
                            Noticia: {this.state.noticia}
                        </Card.Text>
                    </Card.Body>
                    <div style={{ margin: "auto", "margin-top": "15px", "margin-bottom": "15px" }}>
                        <button type="button" class="btn btn-dark" onClick={this.btnClick}>VISTO</button>
                    </div>
                </Card>
            </div>
        )
    }
}