import React, { Component } from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import FormControl from 'react-bootstrap/FormControl'
import Image from 'react-bootstrap/Image'
import { Link,Redirect } from 'react-router-dom';
import { Route } from 'react-router';
import axios from 'axios';
import {Nav,NavDropdown} from 'react-bootstrap';
import idea from './idea.png';


import './Header.css'

// Clase encargada de la visualización header en todas las ventanas
// en la aplicación
class Header extends Component {
    state = {
        isAuth: false,
        reloadMainPage:false,
    }

    // Llena los arreglos con la información requerida para presentar
    // cuando se accede a la ventana
    componentWillMount(){
        var self=this;
        axios.post('/getSesion',{}).then(function(res){
            if(res.data.loggedIn == true) self.setState({isAuth:true})
            else self.setState({isAuth:false});
        })
    }

    // PErmite el cierre de Sesión, para que otrp asesor pueda acceder
    logOut(){
        try {this.props.reload()} catch(error){}
        axios.post("/cerrarSesion",{})
        .then(function (res) {
          })
          .catch(function (err) {
          });        
        this.setState({
            isAuth:false,
            reloadMainPage:true,
        })
    }

    // En esta parte se hace el diseño del header en todas las ventanas
    // y se llama a las funciones anteriores.
    render() {
        var session = this.state.isAuth;
        if(!this.state.reloadMainPage) {
        return (<>
            <head>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
            </head>
            <header className="header">
            <div className="topContainer" display="inline">
                    {/* Home logo */}
                    <Navbar  variant="dark"  expand="lg">
                        <Navbar.Brand href="/VentanaAsesor"><img href="/VentanaAsesor" src={idea} alt={"logo"} width="40" height="50"/> Movilize!!</Navbar.Brand>
                    </Navbar>
                    <Navbar  variant="dark"  expand="lg">
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="mr-auto">
                            <Route render={() => {
                                if(!session){ 
                                    return <> 
                                        {/* <Nav.Link href="/contacto">Contáctenos</Nav.Link>
                                        <Nav.Link href="/registroMiembro">Registrarse</Nav.Link> */}
                                        <Nav.Link href="/login">Iniciar Sesión</Nav.Link>
                                    </>
                                }
                                else{ 
                                    return <>
                                        <Nav.Link href="/ventanaAsesor">Inicio</Nav.Link>                                 
                                        <NavDropdown title="Realizar movimientos" id="basic-nav-dropdown">
                                            <NavDropdown.Item href="/registroMiembro">Registrar nuevo miembro</NavDropdown.Item>
                                            <NavDropdown.Divider />
                                            <NavDropdown.Item href="/asignacionMiembros">Asignar miembros a grupo</NavDropdown.Item>
                                            <NavDropdown.Divider />
                                            <NavDropdown.Item href="/trasladoMiembro">Trasladar miembro de grupo</NavDropdown.Item>
                                            <NavDropdown.Divider />
                                            <NavDropdown.Item href="/cambiarNombreGrupo">Cambiar nombre de grupo</NavDropdown.Item>
                                            <NavDropdown.Divider />
                                            <NavDropdown.Item href="/PosiblesMonitores">Establecer posibles mentores de grupo</NavDropdown.Item>
                                            <NavDropdown.Divider />
                                        </NavDropdown>  
                                        <NavDropdown alignItems="left" title="Consultas" id="basic-nav-dropdown">
                                            <NavDropdown.Item href="/consultaComposicionGrupo">Ver composición de un grupo</NavDropdown.Item>
                                            <NavDropdown.Divider />
                                            <NavDropdown.Item href="/consultaGruposPorMiembro">Grupos y roles por miembro</NavDropdown.Item>
                                            <NavDropdown.Divider />
                                            <NavDropdown.Item href="/consultaMiembrosPorElemento">Miembros por elemento</NavDropdown.Item>
                                            <NavDropdown.Divider />
                                            <NavDropdown.Item href="/arbolEstructural">Arbol</NavDropdown.Item>
                                            <NavDropdown.Divider />
                                        </NavDropdown>   
                                        <NavDropdown title="Crear estructuras" id="basic-nav-dropdown">
                                            <NavDropdown.Item href="/crearZona">Crear zona</NavDropdown.Item>
                                            <NavDropdown.Divider />
                                            <NavDropdown.Item href="/crearRama">Crear rama</NavDropdown.Item>
                                            <NavDropdown.Divider />
                                            <NavDropdown.Item href="/crearGrupo">Crear grupo</NavDropdown.Item>
                                            <NavDropdown.Divider />
                                        </NavDropdown>
                                        <Nav.Link className="link" to="/" onClick={() => this.logOut()}>Cerrar sesión</Nav.Link>                                 
                                    </> 
                                }
                            }}/>
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                </div>
            </header>
            </>
        )
        }else return(
            <>
            <Redirect to="./logIn"></Redirect>
            </>
        )
    }
}
export default Header;