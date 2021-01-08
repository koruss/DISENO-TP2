import React,{ Component } from 'react'
import './SignUp.css'
import axios from 'axios';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import Header from '../General/Header';
import makeAnimated from 'react-select/animated';
import Select from 'react-select';


// Clase encargada para el acceso 
// en la aplicación
class SignUp extends Component{

    // Metodo constructor de la clase que recibe los props para 
    // la creación de una personas dentro de la aplicación
    constructor(props){
        super(props);
        this.identificacionRef=React.createRef();
        this.correoRef=React.createRef();
        this.contrasenaRef=React.createRef();
        this.nombreRef=React.createRef();
        this.celularRef=React.createRef();
        this.apellido1Ref=React.createRef();
        this.apellido2Ref=React.createRef();
    }


    // El state guarda los datos brindados por el usuario
    // para ser utilizados cuando se cree en la aplicación
    state = {
        paisOpc:[
            { value: "Costa Rica", label: "Costa Rica" }
        ],
        provinciaOpc:[
            { value: "Cartago", label: "Cartago" },
            { value: "San Jose", label: "San Jose" },
            { value: "Heredia", label: "Heredia" }
        ],
        cantonOpc:[
            { value: "Turrialba", label: "Turrialba" },
            { value: "Juan Vinas", label: "Juan Vinas" }
        ],
        distritoOpc:[
            { value: "Tayutic", label: "Tayutic" },
            { value: "La Suiza", label: "La Suiza" }
        ],
        identificacion: "",
        correo: "",
        contrasena: "",
        nombre: "",
        celular: "",
        apellido1: "",
        apellido2: "",
        pais: [],
        provincia: [],
        canton: [],
        distrito: [],
        movimientoOpc :[],
        movimiento: []
    }
    

    onChange = (e) => this.setState({[e.target.name]:e.target.value});


    //Funcion para manejar los eventos de un boton
    onClick = (e) => {
        if(this.state.identificacion != "" && this.state.correo != "" &&
            this.state.nombre != "" && this.state.celular != "" &&
            this.state.apellido1 != "" && this.state.apellido2 != "" &&
            this.state.pais.length != 0 && this.state.provincia.length != 0 &&
            this.state.canton.length != 0 && this.state.distrito.length != 0 &&
            this.state.contrasena != ""){
            axios.post("/guardarMiembro",{
                pais:this.state.pais,
                provincia:this.state.provincia,
                canton:this.state.canton,
                distrito:this.state.distrito,
                identificacion:this.state.identificacion,
                correo:this.state.correo,
                nombre:this.state.nombre,
                celular:this.state.celular,
                apellido1:this.state.apellido1,
                apellido2:this.state.apellido2,
                contrasena:this.state.contrasena,
                movimiento:this.state.movimiento._id
            }).then(res =>{
                if(!res.data.success){
                    alert(res.data.err);
                }
                else{
                    alert("Miembro Guardado correctamente")
                    this.identificacionRef.current.value="";
                    this.correoRef.current.value="";
                    this.nombreRef.current.value="";
                    this.celularRef.current.value="";
                    this.apellido1Ref.current.value="";
                    this.apellido2Ref.current.value="";
                    this.contrasenaRef.current.value="";
                    this.setState({
                        movimiento:[]
                    })
                    this.setState({
                        pais:[]
                    })
                    this.setState({
                        canton:[]
                    })
                    this.setState({
                        provincia:[]
                    })
                    this.setState({
                        distrito:[]
                    })
                }
            })
        }
        else{
            alert("Ingrese todos los datos")
        }
    }

    obtenerMovimientos(){
        let arrMov = [];
        axios.post("/allMovimientos", {}).then(res => {
            const respuesta = res.data;
            respuesta.forEach(movimiento=>{
                arrMov.push({
                    value:movimiento.nombre,
                    label:movimiento.nombre,
                    _id:movimiento._id
                })
            })   
            this.setState({
                movimeintoOpc:arrMov
            })
        })
    }

    componentWillMount() {
        this.obtenerMovimientos();
    }


    // Setean los datos seleccionados en los comboBox
    // y pasan la información a la ejecución del boton
    handleChangePais = pais => {
        this.setState(
            { pais },     
        );
    };

    handleChangeProvincia = provincia => {
        this.setState(
            { provincia },     
        );
    };

    handleChangeCanton = canton => {
        this.setState(
            { canton },     
        );
    };

    handleChangeDistrito = distrito => {
        this.setState(
            { distrito },     
        );
    };

    handleChangeMovimiento = movimiento =>{
        this.setState(
            { movimiento },     
        );
    };

    // En esta parte se hace el diseño de la ventana de Registro de miembros
    // y se llama a las funciones anteriores.
    render() {
        return (
            <div>
            <Header></Header>
                <div class="box-container-yellow">
                    <h1>Afiliar nuevo miembro a la organizacion</h1>
                        <div class="label-container">
                            <div className="label-wrapper">
                                <label for="identificacion">Identificacion : </label>
                                <input ref={this.identificacionRef} type="text" name="identificacion" onChange={this.onChange} className="input-standar"/>
                            </div>
                            <div className="label-wrapper">
                                <label for="correo">Correo Electronico: </label>
                                <input ref={this.correoRef}  type="text" name="correo" onChange={this.onChange} className="input-standar"/>
                            </div>
                            <div className="label-wrapper">
                                <label for="correo">Contraseña: </label>
                                <input ref={this.contrasenaRef}  input type="text" name="contrasena" onChange={this.onChange} className="input-standar"/>
                            </div>
                            <div className="label-wrapper">
                                <label for="nombre">Nombre: </label>
                                <input ref={this.nombreRef} type="text" name="nombre" onChange={this.onChange} className="input-standar"/>
                            </div>
                            <div className="label-wrapper">
                                <label for="celular">Celular Personal: </label>
                                <input ref={this.celularRef} type="text" name="celular" onChange={this.onChange} className="input-standar"/>
                            </div>
                            <div className="label-wrapper">
                                <label for="apellido1">Apellido1: </label>
                                <input ref={this.apellido1Ref} type="text" name="apellido1" onChange={this.onChange} className="input-standar"/>
                            </div>
                            <div className="label-wrapper">
                                <label for="apellido2">Apellido2: </label>
                                <input ref={this.apellido2Ref} type="text" name="apellido2" onChange={this.onChange} className="input-standar"/>
                            </div>
                        </div>
                        
                        <div class="label-container">
                        <div className="label-wrapper">
                            <label for="pais">Movimiento: </label>
                                <div className="label-select" >
                                    <Select components={makeAnimated} name="movimiento" value={this.state.movimiento} className="basic-multi-select"
                                    options={this.state.movimeintoOpc} classNamePrefix="select" onChange={this.handleChangeMovimiento}/>   
                                </div>
                            </div>
                            <div className="label-wrapper">
                            <label for="pais">Pais: </label>
                                <div className="label-select" >
                                    <Select components={makeAnimated} name="pais" value={this.state.pais} className="basic-multi-select"
                                    options={this.state.paisOpc} classNamePrefix="select" onChange={this.handleChangePais}/>   
                                </div>
                            </div>
                            <div className="label-wrapper">
                                <label for="provincia">Provincia: </label>
                                <div className="label-select">
                                    <Select components={makeAnimated} name="provincia" onChange={this.handleChangeProvincia}
                                    options={this.state.provinciaOpc} classNamePrefix="select" value={this.state.provincia}/>
                                </div>
                            </div>
                            <div className="label-wrapper">
                                <label for="canton">Canton: </label>
                                <div className="label-select">
                                    <Select components={makeAnimated} name="canton" onChange={this.handleChangeCanton}
                                    options={this.state.cantonOpc} classNamePrefix="select" value={this.state.canton}/>
                                </div>
                            </div>
                            <div className="label-wrapper">
                                <label for="distrito">Distrito: </label>
                                <div className="label-select">
                                    <Select components={makeAnimated} name="distrito"  onChange={this.handleChangeDistrito}
                                    options={this.state.distritoOpc} classNamePrefix="select" value={this.state.distrito}/>
                                </div>
                            </div>
                            <div className="label-wrapper">
                            <button type="button" class="btn btn-dark" onClick={this.onClick} >Registrarse</button>
                            </div>
                        </div>
                </div> 
            </div>
        )
    }
};

export default SignUp;