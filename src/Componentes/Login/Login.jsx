import React,{ Component } from 'react'
import './Login.css'
import axios from 'axios';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
//import {Redirect} from 'react-router-dom';
import Header from '../General/Header';
import { Link } from 'react-router-dom';

// Clase encargada para el acceso 
// en la aplicación
class Login extends Component{

    // Metodo constructor de la clase que recibe los props para 
    // la creación de grupos dentro de la aplicación
    constructor(props){
        super(props);
        this.idRef=React.createRef();
        this.contrasenaRef=React.createRef();
    }

    // El state guarda los datos brindados por el usuario
    // para ser utilizados cuando se cree en la aplicación
    state = {
        personas: [],
        movimientos: [],
        isAuth: null,
        id: "",
        contrasena: ""
    };

    //Funcion para manejar los eventos de un boton
    onClick = (e) => {
        var self = this;
        if(this.state.userName != null && this.state.password!=null){
            axios.post('/iniciarSesion',{
                usuario:this.state.userName,
                password:this.state.password,
                personas:this.state.personas,
                movimientos:this.state.movimientos}).then(res=>{
                if(res.data.tipo != null){ 
                    self.setState({ isAuth: res.data.tipo })
                }
                else {
                    alert("Nombre de usuario o contraseña incorrecto!!");
                    this.idRef.current.value="";
                    this.contrasenaRef.current.value="";
                }
            })
        }
        else {
            alert("Nombre de usuario o contraseña incorrecto!!");
            this.userNameRef.current.value="";
            this.passwordRef.current.value="";
        }
    }
     

    obtenerPersonas(){
        let arreglo = [];
        axios.post("/allPersona", {}).then(res => {
            const respuesta = res.data;
            respuesta.forEach(nombre=>{
                arreglo.push({
                    datosPersona:[{ _id:nombre._id,
                        identificacion:nombre.identificacion,
                        contrasena:nombre.contrasena,
                        tipo:nombre.tipo,
                        idMovimiento:nombre.idMovimiento,
                        nombre:nombre.nombre,
                        apellido1:nombre.apellido1,
                        apellido2:nombre.apellido2}]
                })
            })   
            this.setState({
                personas:arreglo
            })
        })
    }

    obtenerMovimientos(){
        let arrMov = [];
        axios.post("/allMovimientos", {}).then(res => {
            const respuesta = res.data;
            respuesta.forEach(movimiento=>{
                arrMov.push({
                    value:movimiento.nombre,
                    label:movimiento.nombre,
                    _id:movimiento._id,
                    nombre:movimiento.nombre
                })
            })   
            this.setState({
                movimientos:arrMov
            })
        })
    }

     // Llena los arreglos con la información requerida para presentar
    // cuando se accede a la ventana
    componentWillMount() {
        this.obtenerPersonas();
        this.obtenerMovimientos();
    }

    onChange = (e) => this.setState({[e.target.name]:
        e.target.value}); 
 

    // En esta parte se hace el diseño de la ventana de login
    // y se llama a las funciones anteriores.
    render(){    
        if(this.state.isAuth == null) {
        return(  
            <div>
                <Header></Header>
                    <div id="center-section">
                        <div id="main-section">
                            <div class="border">
                                <div id="center-section" >
                                    <h1>Log In</h1>
                                    <div class="spacig-base">
                                        <label for="email">Identificación</label>
                                        <input ref={this.idRef} type="text" name="userName" autoComplete="on" onChange={this.onChange} tabIndex="1"></input>
                                    </div>    
                                    <div class="spacig-base">
                                        <label for="password">Contraseña</label>
                                        <input ref={this.contrasenaRef} type="password" name="password" onChange={this.onChange} tabIndex="2"/>       
                                    </div>  
                                    <div class="spacing-base">
                                        <button type="button" class="btn btn-dark" onClick={this.onClick} >Log in </button>
                                    </div> 
                                </div>
                            </div>
                        </div>
                        <div class="divider">
                            <h5>¿No tienes cuenta?</h5>
                        </div>
                        <span id="registrationLink" class="button" >
                            <Link to="/SignUp" className="btn btn-primary">Registro</Link>          
                        </span>
                    </div>
            </div>
        )}
        else if(this.state.isAuth == "MIEMBRO"){
            return(
                <>
                <Redirect to="/ventanaMiembro"></Redirect>
                </>
            )
        }
        else if(this.state.isAuth == "JEFE"){
            return(
                <>
                <Redirect to="/ventanaJefe"></Redirect>
                </>
            )
        }
        else if(this.state.isAuth == "ASESOR"){
            return(
            <>
            <Redirect to="/ventanaAsesor"></Redirect>
            </>
        )}
    };
}

export default Login;