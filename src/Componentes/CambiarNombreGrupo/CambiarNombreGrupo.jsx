import React,{ Component } from 'react'
import './CambiarNombreGrupo.css'
import '../../Componentes/General/Utils.css'
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import Header from '../General/Header';
import axios from 'axios';

class CambiarNombreGrupo extends Component{
/*El constructor de la clase */ 
    constructor(props){
        super(props);
        this.nombreRef=React.createRef();
    }

    state = {
        selectedZona:[],
        selectedRama:[],
        selectedGrupo:[],
        nombre:"",
        zonas:[],
        ramas:[],
        grupos:[]
    }

   
   /* esta funcion se encarga de recibir la info del componente y lo setea en un  state*/
   
    onChange = (e) => this.setState({[e.target.name]:e.target.value});

/*
Esta funcion se ejecuta automaticamente, obtiene todas las zonas,
*/
    componentWillMount() {
        var self = this;
        let arreglo = [];
        axios.post("/allZonas", {}).then(res => {
            const respuesta = res.data;
            respuesta.forEach(zona=>{
                arreglo.push({
                    value:zona.nombreZona,
                    label:zona.nombreZona
                })
            })   
            this.setState({
                zonas:arreglo
            })
        })
    }


/*
obtiene todas las ramas y las guarda en la ventana
*/ 
    obtenerRamas(){
        var self = this;
        let arreglo =[];
        axios.post("/allRama", {}).then(res => {
            const respuesta=res.data;
            const zonaNombre = this.state.selectedZona.value;
            respuesta.forEach(rama=>{
                if(rama.zona == zonaNombre){
                    arreglo.push({
                        value:rama.nombreRama,
                        label:rama.nombreRama
                    })
                }
            })   
            this.setState({
                ramas:arreglo
            })
        })
    }

/*
obtiene todos los  grupos y los guarda en la ventana
*/
    obtenerGrupos(){
        var self = this;
        let arreglo =[];
        axios.post("/allGrupos", {}).then(res => {
            const respuesta=res.data;
            const ramaNombre = this.state.selectedRama.value;
            respuesta.forEach(grupo=>{
                if(grupo.nombreRama == ramaNombre && grupo.monitores.length != 0){
                    arreglo.push({
                        value:grupo.nombreGrupo,
                        label:grupo.nombreGrupo,
                        identificacion:grupo._id
                    })
                }
            })   
            this.setState({
                grupos:arreglo
            })
        })
    }

    //Funcion para manejar los eventos de un boton
    onClick = (e) => {
        if(this.state.nombre != "" && this.state.selectedRama.length != 0 &&
        this.state.selectedZona.length != 0 && this.state.selectedGrupo.length != 0){
            axios.post("/cambiarNombreGrupo",{
                zona:this.state.selectedZona,
                rama:this.state.selectedRama,
                grupo:this.state.selectedGrupo,
                nombre:this.state.nombre
            }).then(res =>{
                if(!res.data.success){
                    alert(res.data.err);
                }
                else{
                    alert("Nombre de grupo modificado correctamente")
                    this.nombreRef.current.value="";
                    this.setState({
                        selectedRama:[]
                    })
                    this.setState({
                        selectedZona:[]
                    })
                    this.setState({
                        selectedGrupo:[]
                    })
                }
            })
        }
        else{
            alert("Ingrese todos los datos")
        }
    }
/*Esta funcion lo que hace es asignar los datos del componente en su respectivo state */ 
    handleChangeZonas = selectedZona => {
        this.setState(
            { selectedZona }
        );
        this.limpiarRamas();
        this.obtenerRamas();
    }
/*Esta funcion lo que hace es asignar los datos del componente en su respectivo state */ 
    handleChangeRamas = selectedRama => {
        this.setState(
            {selectedRama}
        );
        this.limpiarGrupos();
        this.obtenerGrupos();
    }
/*Esta funcion lo que hace es asignar los datos del componente en su respectivo state */ 
    handleChangeGrupo = selectedGrupo => {
        this.setState(
            { selectedGrupo },     
        );
    };
/*
Limpia los states 
*/
    limpiarRamas(){
        this.state.selectedRama = []
    }
/*
Limpia los states 
*/
    limpiarGrupos(){
        this.state.selectedGrupo = []
    }

/* se encarga de renderizar el codigo html*/
render() {
    return (
        <div>
        <Header></Header>
        <main className = "container">
                <div id="center-section">
                    <h2>Cambiar nombre grupo</h2>
                    <div class="form-group">
                        <label for="zona">Seleccione la zona a la que pertenece el grupo:</label>
                        <Select components={makeAnimated} name="zona" onChange={this.handleChangeZonas} 
                        value={this.state.selectedZona} options={this.state.zonas} classNamePrefix="select"/>
                    </div>
                    <div class="form-group" class="spacing-base">
                        <label for="rama">Seleccione la rama a la que pertenece el grupo:</label>
                        <Select components={makeAnimated} name="rama" onChange={this.handleChangeRamas} 
                        value={this.state.selectedRama} options={this.state.ramas} classNamePrefix="select"/>
                    </div>
                    <div class="form-group" class="spacing-base">
                        <label for="grupo">Seleccione el grupo al que desea cambiarle el nombre:</label>
                        <Select components={makeAnimated} name="grupo" onChange={this.handleChangeGrupo} 
                        value={this.state.selectedGrupo} options={this.state.grupos} classNamePrefix="select"/>
                    </div>
                    <div class="form-group" class="spacing-base">
                        <label for="nombreNuevo">Nuevo nombre:</label>
                        <input ref={this.nombreRef} type="text" name="nombre" onChange={this.onChange}  className="input-standar"/>
                    </div>
                </div>
                
                <button type="button" class="btn btn-dark"  onClick={this.onClick}>Cambiar</button>
        </main>
    </div>    
    )
};

}

export default CambiarNombreGrupo;