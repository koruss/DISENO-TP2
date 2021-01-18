import React, { Component } from 'react'
import './Contacto.css';
import axios from 'axios';
import Header from '../General/Header';


// Clase encargada de la comunicación por medio de una página de contacto  
// en la aplicación
export default class Contacto extends Component {

    // El state guarda los datos brindados por el usuario
    // para ser utilizados cuando se cree en la aplicación
    state = {
        Email: '',
        firstname: '',
        subject: ''
    };


    //Funcion para manejar los eventos de un boton
    contacto = (e) => {
        e.preventDefault();
        var self = this;
        axios.post('Contacto', {
            pName: this.state.firstname,
            pEmail: this.state.email,
            pMensaje: this.state.subject
        }).then(self.setState({ isAuth: true }), alert('A name was submitted: ' + this.state.firstname))
    }

    onChange = (e) => this.setState({ [e.target.name]: e.target.value })

    // En esta parte se hace el diseño de la ventana para mostrar grupos y roles
    // y se llama a las funciones anteriores.
    render() {
        return (
            <div>
                <Header></Header>
                <form onSubmit={this.contacto}>
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <style dangerouslySetInnerHTML={{ __html: "\nbody {font-family: Arial, Helvetica, sans-serif;}\n* {box-sizing: border-box;}\n\ninput[type=text], select, textarea {\n width: 100%;\n padding: 12px;\n border: 1px solid #ccc;\n border-radius: 4px;\n box-sizing: border-box;\n margin-top: 6px;\n margin-bottom: 16px;\n resize: vertical;\n}\n\ninput[type=submit] {\n background-color: #4CAF50;\n color: white;\n padding: 12px 20px;\n border: none;\n border-radius: 4px;\n cursor: pointer;\n}\n\ninput[type=submit]:hover {\n background-color: #45a049;\n}\n\n.container {\n border-radius: 5px;\n background-color: #f2f2f2;\n padding: 20px;\n}\n" }} />
                    <h3>CONTACTA CON NOSOTROS </h3>
                    <div className="container">
                        <form action="/action_page.php">
                            <label htmlFor="fname">Nombre</label>
                            <input type="text" id="fname" name="firstname" placeholder="Nombre..." value={this.state.value} onChange={this.onChange} />
                            <label htmlFor="fname">Email</label>
                            <input type="text" id="fname" name="Email" placeholder="Email.." email={this.state.email} onChange={this.onChange} />
                            <label htmlFor="subject">Mensaje</label>
                            <textarea id="subject" name="subject" placeholder="Escribe tu consulta.." style={{ height: '200px' }} defaultValue={""} onChange={this.onChange} />
                            <input type="submit" defaultValue="Submit" />
                        </form>
                    </div>
                </form>
            </div>
        );
    };
}
