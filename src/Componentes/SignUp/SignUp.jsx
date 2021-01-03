import React,{ Component } from 'react'
import './SignUp.css'
import axios from 'axios';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
//import {Redirect} from 'react-router-dom';
import Header from '../General/Header';


// Clase encargada para el acceso 
// en la aplicación
class SignUp extends Component{

    // Metodo constructor de la clase que recibe los props para 
    // la creación de grupos dentro de la aplicación
    constructor(props){
        super(props);
        this.userNameRef=React.createRef();
        this.passwordRef=React.createRef();
    }

    // El state guarda los datos brindados por el usuario
    // para ser utilizados cuando se cree en la aplicación
    state = {
        isAuth: false
    };
      
    //Clase que se encarga de la validación y acceso de las personas
    logIn = (e) => {
        e.preventDefault();
        var self = this;
        if(this.state.userName != null && this.state.password!=null){
        axios.post('/allAsesores',{usuario:this.state.userName,password:this.state.password}).then(res=>{
            const respuesta=res.data;
            if(1 == 1){//if(respuesta.contrasena == this.state.password){
                    axios.post('/logIn',{pName:this.state.userName,pPassword:this.state.password}).then(res=>{});
                    self.setState(
                        {
                            isAuth: true
                        }
                    )
                }  else {
                    alert("Nombre de usuario o contraseña incorrecto!!");
                    this.userNameRef.current.value="";
                    this.passwordRef.current.value="";
                }
        }) 
        }else {
            alert("Nombre de usuario o contraseña incorrecto!!");
            this.userNameRef.current.value="";
            this.passwordRef.current.value="";
        }
    }

    onChange = (e) => this.setState({[e.target.name]:
        e.target.value}); 

    

    // En esta parte se hace el diseño de la ventana de login
    // y se llama a las funciones anteriores.
    render(){    
        if(!this.state.isAuth) {
        return(  
            <div>
                <Header></Header>
                {/*<h1>{auth.getAuth()?"hola":"no sirve"}</h1>*/}
                <form onSubmit={this.logIn}> 
                    <div id="center-section">
                        <div id="main-section">
                            <div class="border">
                                <div class="box-container">
                                    <h1>Log In</h1>
                                    <div class="spacig-base">
                                        <label for="email">Username or Email JIJIJIJI</label>
                                        <input ref={this.userNameRef} type="text" name="userName" autoComplete="on" onChange={this.onChange} tabIndex="1"></input>
                                    </div>    
                                    <div class="spacig-base">
                                        <label for="password">Password</label>
                                        <input ref={this.passwordRef} type="password" name="password" onChange={this.onChange} tabIndex="2"/>       
                                    </div>  
                                    <div class="spacing-base">
                                        <span class="button buttonInside">
                                            <button type="submit" class="button-text" tabIndex="3">Log in</button>
                                        </span>
                                    </div> 
                                </div>
                            </div>
                        </div>
                        <div class="divider">
                            <h5>You don't have an account?</h5>
                        </div>
                        <span id="registrationLink" class="button" >
                            <button type="button" class="btn btn-dark" onClick={this.onClick}  disabled="true">Registrar Asesor </button>             
                        </span>
                    </div>
                </form>
            </div>
        )
        }else return (
            <>
            <Redirect to="/ventanaAsesor"></Redirect>
            </>
        )
    };
}

export default SignUp;