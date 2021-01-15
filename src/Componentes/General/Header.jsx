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
        isAuth: null,
        reloadMainPage:false,
        nombre_movimiento: null
    }

    // Llena los arreglos con la información requerida para presentar
    // cuando se accede a la ventana
    componentWillMount(){
        var self=this;
        axios.post('/getSesion',{}).then(function(res){
            if(res.data.loggedIn == true) self.setState({isAuth:res.data.tipo, nombre_movimiento:res.data.nombre_movimiento})
            else self.setState({isAuth:null});
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
            isAuth:null,
            nombre_movimiento:null,
            reloadMainPage:true,
        })
    }

    // En esta parte se hace el diseño del header en todas las ventanas
    // y se llama a las funciones anteriores.
    render() {
        var session = this.state.isAuth;
        var nombre_movimiento = this.state.nombre_movimiento;
        if(!this.state.reloadMainPage) {
        return (<>
            <head>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
            </head>
            <header className="header">
            <div className="topContainer" display="inline">
                    {/* Home logo */}
                    <Navbar  variant="dark"  expand="lg">
                        <Route render={() => {
                            if(session == "ASESOR"){ 
                                return <>
                                <Navbar.Brand href="/VentanaAsesor"><img href="/VentanaAsesor" src={idea} alt={"logo"} width="40" height="50"/> Movimiento {nombre_movimiento}</Navbar.Brand>
                                </>
                            }
                            else if(session == "MIEMBRO"){
                                return <>
                                <Navbar.Brand href="/ventanaMiembro"><img href="/ventanaMiembro" src={idea} alt={"logo"} width="40" height="50"/> Movimiento {nombre_movimiento}</Navbar.Brand>
                                </>
                            }
                            else if(session == "JEFE"){
                                return <>
                                <Navbar.Brand href="/ventanaJefe"><img href="/ventanaJefe" src={idea} alt={"logo"} width="40" height="50"/> Movimiento {nombre_movimiento}</Navbar.Brand>
                                </>
                            }
                        }}/>
                        <span class="small">Powered by Amber.SA </span>
                    </Navbar>
                    <Navbar  variant="dark"  expand="lg">
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="mr-auto">
                            <Route render={() => {
                                if(session == null){ 
                                    return <> 
                                        {/* <Nav.Link href="/contacto">Contáctenos</Nav.Link>
                                        <Nav.Link href="/registroMiembro">Registrarse</Nav.Link> */}
                                        <Nav.Link href="/login">Iniciar Sesión</Nav.Link>
                                    </>
                                }
                                else if(session == "MIEMBRO"){
                                    return <>
                                        <Nav.Link href="/ventanaMiembro">Inicio</Nav.Link>
                                        <NavDropdown alignItems="left" title="Consultas" id="basic-nav-dropdown">
                                            <NavDropdown.Item href="/consultaComposicionGrupo">Ver composición de un grupo</NavDropdown.Item>
                                            <NavDropdown.Divider />
                                            <NavDropdown.Item href="/bandeja">Ver noticias</NavDropdown.Item>
                                            <NavDropdown.Divider />
                                            <NavDropdown.Item href="/consultaGruposPorMiembro">Ver puestos</NavDropdown.Item>
                                        </NavDropdown>   
                                        <NavDropdown title="Aportes" id="basic-nav-dropdown">
                                            <NavDropdown.Item href="/aportes">Crear aporte</NavDropdown.Item>
                                        </NavDropdown>
                                        <Nav.Link className="link" to="/" onClick={() => this.logOut()}>Cerrar sesión</Nav.Link>                                 
                                    </> 
                                }
                                else if(session == "ASESOR"){ 
                                    return <>
                                        <Nav.Link href="/ventanaAsesor">Inicio</Nav.Link>                                 
                                        <NavDropdown title="Realizar movimientos" id="basic-nav-dropdown">
                                            <NavDropdown.Item href="/asignacionMiembros">Asignar miembros a grupo</NavDropdown.Item>
                                            <NavDropdown.Divider />
                                            <NavDropdown.Item href="/trasladoMiembro">Trasladar miembro de grupo</NavDropdown.Item>
                                            <NavDropdown.Divider />
                                            <NavDropdown.Item href="/cambiarNombreGrupo">Cambiar nombre de grupo</NavDropdown.Item>
                                            <NavDropdown.Divider />
                                            <NavDropdown.Item href="/PosiblesMonitores">Establecer posibles mentores de grupo</NavDropdown.Item>
                                            <NavDropdown.Divider />
                                            <NavDropdown.Item href="/registroMiembro">Registrar persona en movimiento</NavDropdown.Item>
                                        </NavDropdown>  
                                        <NavDropdown alignItems="left" title="Consultas" id="basic-nav-dropdown">
                                            <NavDropdown.Item href="/consultaComposicionGrupo">Ver composición de un grupo</NavDropdown.Item>
                                            <NavDropdown.Divider />
                                            <NavDropdown.Item href="/consultaGruposPorMiembro">Grupos y roles por miembro</NavDropdown.Item>
                                            <NavDropdown.Divider />
                                            <NavDropdown.Item href="/consultaMiembrosPorElemento">Miembros por elemento</NavDropdown.Item>
                                            <NavDropdown.Divider />
                                            <NavDropdown.Item href="/arbolEstructural">Arbol</NavDropdown.Item>
                                        </NavDropdown>   
                                        <NavDropdown title="Crear estructuras" id="basic-nav-dropdown">
                                            <NavDropdown.Item href="/crearZona">Crear zona</NavDropdown.Item>
                                            <NavDropdown.Divider />
                                            <NavDropdown.Item href="/crearRama">Crear rama</NavDropdown.Item>
                                            <NavDropdown.Divider />
                                            <NavDropdown.Item href="/crearGrupo">Crear grupo</NavDropdown.Item>
                                        </NavDropdown>
                                        <NavDropdown title="Aportes" id="basic-nav-dropdown">
                                            <NavDropdown.Item href="/aportes">Crear aporte</NavDropdown.Item>
                                            <NavDropdown.Divider />
                                            <NavDropdown.Item href="/ReporteAportes">Reporte de aportes</NavDropdown.Item>
                                        </NavDropdown>
                                        <Nav.Link className="link" to="/" onClick={() => this.logOut()}>Cerrar sesión</Nav.Link>                                 
                                    </> 
                                }
                                else if(session == "JEFE"){ 
                                    return <>
                                        <Nav.Link href="/ventanaJefe">Inicio</Nav.Link>
                                        <NavDropdown alignItems="left" title="Consultas de rango" id="basic-nav-dropdown">
                                            <NavDropdown.Item href="/consultaComposicionGrupo">Ver composición de grupos que monitorea</NavDropdown.Item>
                                            <NavDropdown.Divider />
                                            <NavDropdown.Item href="/consultaComposicionRama">Ver informacion de ramas a las que pertenece</NavDropdown.Item>
                                            <NavDropdown.Divider />
                                            <NavDropdown.Item href="/consultaComposicionZona">Ver informacion de zonas a las que pertenece</NavDropdown.Item>
                                            <NavDropdown.Divider />
                                            <NavDropdown.Item href="/arbolEstructural">Ver informacion de nodo</NavDropdown.Item>
                                        </NavDropdown>
                                        <NavDropdown title="Aportes" id="basic-nav-dropdown">
                                            <NavDropdown.Item href="/aportes">Crear aporte</NavDropdown.Item>
                                        </NavDropdown>
                                        <NavDropdown title="Publicaciones" id="basic-nav-dropdown">
                                            <NavDropdown.Item href="/bandeja">Ver noticias</NavDropdown.Item>
                                            <NavDropdown.Divider />
                                            <NavDropdown.Item href="/crearNoticia">Crear Noticia</NavDropdown.Item>
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