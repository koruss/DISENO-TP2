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

    /*Esta funcion lo que hace es asignar los datos del componente en su respectivo state */ 
    handleChangeZonas = selectedZona => {
        this.setState(
            { selectedZona }
        );
        this.limpiarRamas();
        this.obtenerRamas(selectedZona);
    }
/*Esta funcion lo que hace es asignar los datos del componente en su respectivo state */ 
    handleChangeRamas = selectedRama => {
        this.setState(
            {selectedRama}
        );
        this.limpiarGrupos();
        this.obtenerGrupos(selectedRama);
    }
/*Esta funcion lo que hace es asignar los datos del componente en su respectivo state */ 
    handleChangeGrupo = selectedGrupo => {
        this.setState(
            { selectedGrupo },     
        );
    };


/*
Esta funcion se ejecuta automaticamente, obtiene todas las zonas,
*/
    componentWillMount() {
        var self = this;
        let arreglo = [];
        axios.post('/getSesion',{}).then((res) =>{
            const id_movimiento = res.data.id_movimiento;
            axios.post("/allZonas", {}).then(res => {
                const respuesta = res.data;
                respuesta.forEach(zona=>{
                    if(zona.idMovimiento == id_movimiento){
                        arreglo.push({
                            value:zona.nombre,
                            label:zona.nombre,
                            _id:zona._id

                        })
                    }
                })   
                this.setState({
                    zonas:arreglo
                })
            })
        })
    }


/*
obtiene todas las ramas y las guarda en la ventana
*/ 

    obtenerRamas(selectedZona){
        let arreglo =[];
        axios.post("/allRamaZona", {_id:selectedZona._id}).then(res => {
            const respuesta=res.data;
            respuesta.forEach(rama=>{
                arreglo.push({
                    value:rama.nombre,
                    label:rama.nombre,
                    _id:rama._id
                })
            })   
            this.setState({
                ramas:arreglo
            })
        })
    }

/*
obtiene todos los  grupos y los guarda en la ventana
*/
    obtenerGrupos(selectedRama){
        var self = this;
        let arreglo =[];
        axios.post("/allGruposRama", {_id:selectedRama._id}).then(res => {
            const respuesta=res.data;
            respuesta.forEach(grupo=>{
                    arreglo.push({
                        value:grupo.nombre,
                        label:grupo.nombre,
                        _id:grupo._id
                    })
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
                grupo:this.state.selectedGrupo._id,
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